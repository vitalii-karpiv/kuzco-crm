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
  "isTransformer": false,
  "screenSize": 15.6,
  "resolution": "1920x1080",
  "panelType": "IPS",
  "refreshRate": "144Hz",
  "variants": [
    {
      "identifier": "string",
      "ram": 32,
      "ssd": 1024,
      "touch": false,
      "battery": "good",
      "condition": "A",
      "price": 32000,
      "itemList": ["string"]
    }
  ],
  "note": "string"
}
```

### Notes

- Only send fields that should be updated; everything is optional except `id`.
- Use `title` to control the customer-facing label without changing the internal `groupName`.
- `groupName` is immutable after creation; use `title` for any wording changes.
- Changing CPU/GPU, screen size, resolution, panel type, or `isTransformer` regenerates the `groupIdentifier`.
- When variant `itemList` entries are supplied, those laptops get their `laptopGroupId` synced automatically.
- Variants capture RAM/SSD/touch/battery-condition/condition/price snapshots for sets of laptops; their membership is automatically adjusted when laptops move between groups or variants.

## Response

**Status Code:** `200 OK`

Returns the updated laptop group document (same shape as the create response).

