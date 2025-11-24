# Update Laptop Group

Modifies laptop group metadata, variants, and linked laptops.

## Endpoint

```
PATCH /laptopGroup
```

## Authentication

Required – valid JWT.

## Request Body

```json
{
  "id": "string",
  "title": "string",
  "groupDescription": "string",
  "imageUrl": "string",
  "processor": "string",
  "videocard": "string",
  "discrete": true,
  "screenSize": 15.6,
  "resolution": "1920x1080",
  "panelType": "IPS",
  "refreshRate": "144Hz",
  "variants": [
    {
      "laptopId": "string",
      "ram": 32,
      "ssd": 1024,
      "touch": false,
      "keyLight": true,
      "battery": 75,
      "price": 32000
    }
  ],
  "itemList": ["string"],
  "note": "string"
}
```

### Notes

- Only send fields that should be updated; everything is optional except `id`.
- Use `title` to control the customer-facing label without changing the internal `groupName`.
- `groupName` is immutable after creation; use `title` for any wording changes.
- Changing CPU/GPU, screen size, resolution, or panel type regenerates the `groupIdentifier`.
- When `itemList` is supplied, each laptop gets its `laptopGroupId` synced automatically.
- Variants capture RAM/SSD/touch/keyLight/battery/price snapshots and are auto-synced when the underlying laptop changes.

## Response

**Status Code:** `200 OK`

Returns the updated laptop group document (same shape as the create response).

