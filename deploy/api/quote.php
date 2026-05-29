<?php
/**
 * Earth Logistics Inc — Freight quote handler.
 * Handles BOTH the compact quote widget and the full quote calculator.
 * Unknown/extra fields are appended automatically so either form works.
 */
require_once __DIR__ . '/mailer.php';

$data = eli_boot();

$email = eli_clean($data['email'] ?? '');
$phone = eli_clean($data['phone'] ?? '');

if ($email === '' || $phone === '') {
    eli_fail('Email and phone are required to generate a quote.');
}
if (!eli_is_email($email)) {
    eli_fail('Please enter a valid email address.');
}

// Friendly labels for the known fields, in a sensible order.
$labels = [
    'formType'      => 'Quote type',
    'pickupZip'     => 'Pickup ZIP',
    'deliveryZip'   => 'Delivery ZIP',
    'pickup'        => 'Pickup location',
    'delivery'      => 'Delivery location',
    'equipment'     => 'Equipment type',
    'make'          => 'Make',
    'model'         => 'Model',
    'equipmentType' => 'Equipment / machine type',
    'length'        => 'Length',
    'width'         => 'Width',
    'height'        => 'Height',
    'weight'        => 'Weight',
    'pickupDate'    => 'Pickup date',
    'description'   => 'Shipment description',
    'email'         => 'Email',
    'phone'         => 'Phone',
];

$fields = [];
foreach ($labels as $key => $label) {
    if (isset($data[$key]) && eli_clean($data[$key]) !== '') {
        $fields[$label] = $data[$key];
    }
}
// Catch any extra fields the form sent that we didn't map above.
foreach ($data as $key => $value) {
    if ($key === '_gotcha' || $key === 'website') {
        continue;
    }
    if (!array_key_exists($key, $labels) && eli_clean($value) !== '') {
        $pretty = ucwords(trim(preg_replace('/([A-Z])/', ' $1', $key)));
        $fields[$pretty] = $value;
    }
}

eli_send('New freight quote request', $fields, $email);
