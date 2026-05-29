<?php
/**
 * Earth Logistics Inc — Contact form handler.
 * Receives POST from the /contact page ContactForm.
 */
require_once __DIR__ . '/mailer.php';

$data = eli_boot();

$name    = eli_clean($data['name']    ?? '');
$company = eli_clean($data['company'] ?? '');
$email   = eli_clean($data['email']   ?? '');
$phone   = eli_clean($data['phone']   ?? '');
$subject = eli_clean($data['subject'] ?? '');
$message = eli_clean($data['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    eli_fail('Please complete name, email, phone and message.');
}
if (!eli_is_email($email)) {
    eli_fail('Please enter a valid email address.');
}

eli_send(
    'Contact form: ' . ($subject !== '' ? $subject : 'General enquiry'),
    [
        'Name'    => $name,
        'Company' => $company,
        'Email'   => $email,
        'Phone'   => $phone,
        'Subject' => $subject,
        'Message' => $message,
    ],
    $email,
    $name
);
