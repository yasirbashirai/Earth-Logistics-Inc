<?php
/**
 * =============================================================
 *  Earth Logistics Inc — Shared mailer / request helpers
 *  Used by contact.php, quote.php and carrier.php.
 *  No need to edit this file — settings live in config.php.
 * =============================================================
 */

require_once __DIR__ . '/config.php';

/* ------------------------------------------------------------
 *  CORS + method guard. Call once at the top of every endpoint.
 * ---------------------------------------------------------- */
function eli_boot(): array
{
    // CORS
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (ALLOWED_ORIGIN === '*' || $origin === ALLOWED_ORIGIN) {
        header('Access-Control-Allow-Origin: ' . ($origin ?: ALLOWED_ORIGIN));
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Vary: Origin');

    // Pre-flight
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        eli_fail('Method not allowed.', 405);
    }

    // Accept JSON body or classic form-encoded POST.
    $raw  = file_get_contents('php://input');
    $data = [];
    if ($raw !== '' && $raw !== false) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    if (empty($data)) {
        $data = $_POST;
    }

    // Honeypot — bots fill hidden fields. Pretend success, send nothing.
    $trap = trim((string)($data['_gotcha'] ?? $data['website'] ?? ''));
    if ($trap !== '') {
        eli_ok('Thanks — your message has been received.');
    }

    return is_array($data) ? $data : [];
}

/* ------------------------------------------------------------
 *  Sanitise a single value for safe inclusion in an email.
 * ---------------------------------------------------------- */
function eli_clean($value): string
{
    if (is_array($value)) {
        $value = implode(', ', array_map('eli_clean', $value));
    }
    $value = (string) $value;
    // Strip header-injection attempts (newlines in header-bound fields).
    $value = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
    return trim($value);
}

/* ------------------------------------------------------------
 *  Validate a header value (email / name) — block CRLF injection.
 * ---------------------------------------------------------- */
function eli_safe_header(string $value): string
{
    return trim(preg_replace('/[\r\n].*$/s', '', $value));
}

function eli_is_email(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

/* ------------------------------------------------------------
 *  JSON responders.
 * ---------------------------------------------------------- */
function eli_ok(string $message): void
{
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => true, 'message' => $message]);
    exit;
}

function eli_fail(string $message, int $code = 400): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

/* ------------------------------------------------------------
 *  Build a tidy HTML table from label => value pairs and send.
 *
 *  @param string $subject    Email subject line.
 *  @param array  $fields     Ordered [label => value] pairs.
 *  @param string $replyEmail Visitor email for Reply-To (optional).
 *  @param string $replyName  Visitor name for Reply-To (optional).
 * ---------------------------------------------------------- */
function eli_send(string $subject, array $fields, string $replyEmail = '', string $replyName = ''): void
{
    $rowsHtml  = '';
    $rowsText  = '';
    foreach ($fields as $label => $value) {
        $value = eli_clean($value);
        if ($value === '') {
            $value = '—';
        }
        $safeLabel = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
        $safeValue = nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
        $rowsHtml .= "<tr>"
            . "<td style=\"padding:10px 14px;background:#f1f5f9;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;width:34%;vertical-align:top;\">{$safeLabel}</td>"
            . "<td style=\"padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;\">{$safeValue}</td>"
            . "</tr>";
        $rowsText .= "{$label}: {$value}\n";
    }

    $safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $html = "<!doctype html><html><body style=\"margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;\">"
        . "<div style=\"max-width:640px;margin:0 auto;padding:24px;\">"
        . "<div style=\"background:#0b4f3a;color:#ffffff;padding:18px 22px;border-radius:12px 12px 0 0;\">"
        . "<h2 style=\"margin:0;font-size:18px;\">Earth Logistics Inc — New Website Lead</h2>"
        . "<p style=\"margin:4px 0 0;font-size:13px;opacity:.85;\">{$safeSubject}</p>"
        . "</div>"
        . "<table style=\"width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;font-size:14px;\">{$rowsHtml}</table>"
        . "<p style=\"margin:16px 0 0;font-size:12px;color:#64748b;text-align:center;\">Sent automatically from " . SITE_URL . "</p>"
        . "</div></body></html>";

    $text = "Earth Logistics Inc — New Website Lead\n{$subject}\n"
        . str_repeat('-', 48) . "\n" . $rowsText
        . str_repeat('-', 48) . "\nSent automatically from " . SITE_URL . "\n";

    // multipart/alternative so every client renders something clean.
    $boundary = 'eli_' . bin2hex(random_bytes(8));

    $fromName  = eli_safe_header(FROM_NAME);
    $fromEmail = eli_safe_header(FROM_EMAIL);

    $headers  = "From: {$fromName} <{$fromEmail}>\r\n";
    if ($replyEmail !== '' && eli_is_email($replyEmail)) {
        $rn = eli_safe_header($replyName);
        $headers .= 'Reply-To: ' . ($rn !== '' ? "{$rn} <{$replyEmail}>" : $replyEmail) . "\r\n";
    }
    if (defined('BCC_EMAIL') && BCC_EMAIL !== '') {
        $headers .= 'Bcc: ' . eli_safe_header(BCC_EMAIL) . "\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $text . "\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $html . "\r\n";
    $body .= "--{$boundary}--";

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $params = '-f' . $fromEmail; // sets envelope sender → better deliverability

    $sent = @mail(RECIPIENT_EMAIL, $encodedSubject, $body, $headers, $params);

    if ($sent) {
        eli_ok('Thanks — your message has been sent. Our team will respond shortly.');
    }
    eli_fail('We could not send your message right now. Please call dispatch at 855-456-4424.', 500);
}
