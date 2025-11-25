# Add Laptop to Group

Automatically places a laptop into a matching group (creating the group when necessary) and generates a variant entry for it.

## Endpoint

```
POST /laptopGroup/addLaptop
```

## Authentication

Required – valid JWT.

## Request Body

```json
{
  "laptopId": "string"
}
```

The referenced laptop must already exist and have the core characteristics filled in:

- `name`
- `characteristics.processor`
- `characteristics.videocard`
- `characteristics.screenSize`
- `characteristics.resolution`
- `characteristics.panelType`
- `characteristics.ram`
- `characteristics.ssd`
- `characteristics.battery`
- `characteristics.condition`

Missing data for any of these fields triggers a `400` error.

## Behavior

1. Fetches the laptop via `LaptopService`.
2. Generates the target `groupIdentifier` from the laptop specs.
3. If a matching group exists:
   - Adds or updates the matching variant (RAM/SSD/touch/battery-condition/condition/price snapshot).
   - Ensures the laptop ID is present in that variant's `itemList`.
   - Ensures the laptop document has `laptopGroupId` set.
4. Otherwise, a new group is created and seeded from the laptop (its `groupName` and `title` mirror the laptop name), and the laptop is linked to it.

## Response

**Status Code:** `200 OK`

Returns the resulting laptop group document (same shape as `GET /laptopGroup/:id`).

