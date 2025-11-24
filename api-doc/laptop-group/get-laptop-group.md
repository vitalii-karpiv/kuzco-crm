# Get Laptop Group

Returns a single laptop group by its MongoDB ID.

## Endpoint

```
GET /laptopGroup/:id
```

## Authentication

Required – valid JWT.

## Path Parameters

- `id` (string, required) – Laptop group document ID.

## Response

**Status Code:** `200 OK`

```json
{
  "_id": "string",
  "groupIdentifier": "string",
  "groupName": "string",
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
      "ram": 16,
      "ssd": 512,
      "touch": false,
      "keyLight": true,
      "price": 28000
    }
  ],
  "itemList": ["string"],
  "note": "string"
}
```

`404` is returned if the ID does not exist.

