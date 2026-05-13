# Earth Logistics — Image Replacement Guide

Replace placeholder imagery here with real client photography:

- `hero-truck.jpg` — used on the home hero (replace `https://images.unsplash.com/photo-1601584115197-04ecc0da31d3` references in `src/app/page.tsx`)
- `services/dry-van.jpg` — service detail (replace hotlinks in `src/data/services.ts`)
- `services/flatbed.jpg`
- `services/reefer.jpg`
- `services/lowboy.jpg`
- `services/car-hauler.jpg`
- `services/end-dump.jpg`
- `services/pneumatic.jpg`
- `services/tanker.jpg`
- `services/hopper-bottom.jpg`
- `services/hazmat.jpg`

To swap: drop a JPG/WebP here, then update the `image:` field in `src/data/services.ts` (or wherever the hotlink lives) to a local path like `/images/services/dry-van.jpg`.

Real American freight photography only — no stock-looking lifestyle imagery (per brand guidelines).
