<?php
/**
 * Earth Logistics Inc — Application handler.
 * Handles the carrier / shipper / freight-agent "Join" forms.
 * Accepts any field set and emails it as a tidy table.
 */
require_once __DIR__ . '/mailer.php';

$data = eli_boot();

$email = eli_clean($data['email'] ?? '');
$name  = eli_clean($data['name'] ?? '');
$phone = eli_clean($data['phone'] ?? '');

if ($name === '' || $email === '' || $phone === '') {
    eli_fail('Please complete name, email and phone.');
}
if (!eli_is_email($email)) {
    eli_fail('Please enter a valid email address.');
}

$formType = eli_clean($data['formType'] ?? 'Application');

$fields = [];
foreach ($data as $key => $value) {
    if (in_array($key, ['_gotcha', 'website'], true)) {
        continue;
    }
    if (eli_clean($value) === '') {
        continue;
    }
    if ($key === 'formType') {
        continue;
    }
    $pretty = ucwords(trim(preg_replace('/([A-Z])/', ' $1', $key)));
    $fields[$pretty] = $value;
}

eli_send($formType, $fields, $email, $name);
