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

The referenced laptop must already exist and have the core characteristics filled in (`name`, `characteristics.processor`, `characteristics.videocard`, `characteristics.screenSize`, `characteristics.resolution`, `characteristics.panelType`). Missing data triggers a `400` error.

## Behavior

1. Fetches the laptop via `LaptopService`.
2. Generates the target `groupIdentifier` from the laptop specs.
3. If a matching group exists:
   - Adds the laptop ID to `itemList` (if not present).
   - Adds or updates the matching variant (RAM/SSD/touch/keyLight/price snapshot).
   - Ensures the laptop document has `laptopGroupId` set.
4. Otherwise, a new group is created and seeded from the laptop, and the laptop is linked to it.

## Response

**Status Code:** `200 OK`

Returns the resulting laptop group document (same shape as `GET /laptopGroup/:id`).

