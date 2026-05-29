<?php
/**
 * =============================================================
 *  Earth Logistics Inc — Mail configuration
 *  Edit the values below, then upload the whole /api folder.
 * =============================================================
 *
 *  HOW EMAIL WORKS ON BLUEHOST
 *  ---------------------------
 *  Bluehost runs PHP and supports the built-in mail() function.
 *  For mail to actually reach the inbox (and not spam), the
 *  FROM address MUST be an address that lives on the same domain
 *  the site is hosted on. Create that mailbox (or an alias) in
 *  Bluehost → Email Accounts first.
 */

// -------------------------------------------------------------
//  1. WHERE form submissions are delivered (your real inbox).
//     You can list several, comma-separated.
// -------------------------------------------------------------
const RECIPIENT_EMAIL = 'info@ajearthlogistics.com';

// -------------------------------------------------------------
//  2. The FROM address. MUST be a mailbox on your hosting domain
//     (create it in Bluehost → Email Accounts). This is what
//     makes mail() deliverable. Do NOT use the visitor's address.
// -------------------------------------------------------------
const FROM_EMAIL = 'no-reply@earthlogistics247.com';
const FROM_NAME  = 'Earth Logistics Website';

// -------------------------------------------------------------
//  3. Optional: send a copy of every lead to a second address.
//     Leave empty ('') to disable.
// -------------------------------------------------------------
const BCC_EMAIL = '';

// -------------------------------------------------------------
//  4. The public site URL (used in email footers only).
// -------------------------------------------------------------
const SITE_URL = 'https://earthlogistics247.com';

// -------------------------------------------------------------
//  5. Allowed origin for CORS. Keep it locked to your domain.
//     Use '*' only while testing.
// -------------------------------------------------------------
const ALLOWED_ORIGIN = 'https://earthlogistics247.com';
