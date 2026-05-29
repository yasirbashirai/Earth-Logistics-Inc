<?php
/**
 * Earth Logistics Inc — Carrier onboarding handler.
 * Receives the nested JSON payload built by CarrierOnboarding.tsx
 * (carrier identity + equipment + signed broker/carrier agreement).
 */
require_once __DIR__ . '/mailer.php';

$data = eli_boot();

$carrier   = is_array($data['carrier'] ?? null) ? $data['carrier'] : [];
$equipment = is_array($data['equipment'] ?? null) ? $data['equipment'] : [];
$agreement = is_array($data['agreement'] ?? null) ? $data['agreement'] : [];
$refId     = eli_clean($data['referenceId'] ?? '');

$carrierName = eli_clean($carrier['carrierName'] ?? '');
$mc          = eli_clean($carrier['mc'] ?? '');
$primaryEmail = eli_clean($carrier['primaryEmail'] ?? '');

if ($carrierName === '') {
    eli_fail('Carrier name is required.');
}

// Flatten trailers into a readable list.
$trailerLines = [];
if (!empty($equipment['trailers']) && is_array($equipment['trailers'])) {
    foreach ($equipment['trailers'] as $t) {
        if (!is_array($t)) {
            continue;
        }
        $line = eli_clean($t['type'] ?? '');
        $qty  = eli_clean($t['qty'] ?? '');
        if ($qty !== '') {
            $line .= " (qty {$qty})";
        }
        $dims = array_filter([
            eli_clean($t['length'] ?? ''),
            eli_clean($t['width'] ?? ''),
            eli_clean($t['height'] ?? ''),
        ]);
        if ($dims) {
            $line .= ' — ' . implode(' x ', $dims);
        }
        $trailerLines[] = $line;
    }
}

$fields = [
    'Reference ID'        => $refId,
    'Carrier name'        => $carrierName,
    'Address'             => $carrier['address'] ?? '',
    'City / State / ZIP'  => $carrier['cityStateZip'] ?? '',
    'MC number'           => $mc,
    'DOT number'          => $carrier['dot'] ?? '',
    'Primary contact'     => $carrier['primaryContactName'] ?? '',
    'Primary phone'       => $carrier['primaryPhone'] ?? '',
    'Primary email'       => $primaryEmail,
    'Secondary contact'   => $carrier['secondaryContact'] ?? '',
    'Secondary phone'     => $carrier['secondaryPhone'] ?? '',
    'Secondary email'     => $carrier['secondaryEmail'] ?? '',
    'Tractor count'       => $equipment['tractorCount'] ?? '',
    'Sleeper'             => $equipment['sleeper'] ?? '',
    'Trailers'            => $trailerLines ? implode("\n", $trailerLines) : '—',
    'Agreement title'     => $agreement['title'] ?? '',
    'Agreement version'   => $agreement['version'] ?? '',
    'Agreement accepted'  => !empty($agreement['accepted']) ? 'Yes' : 'No',
    'Read confirmed'      => !empty($agreement['readConfirmed']) ? 'Yes' : 'No',
    'Signature (typed)'   => $agreement['signatureTyped'] ?? '',
    'Signer name'         => $agreement['signaturePrintName'] ?? '',
    'Signer title'        => $agreement['signatureTitle'] ?? '',
    'Signature date'      => $agreement['signatureDate'] ?? '',
    'Submitted at'        => $data['submittedAt'] ?? '',
];

eli_send(
    'Carrier onboarding — ' . $carrierName . ($mc !== '' ? " (MC {$mc})" : ''),
    $fields,
    $primaryEmail,
    $carrier['primaryContactName'] ?? ''
);
