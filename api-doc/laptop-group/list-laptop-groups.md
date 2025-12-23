# List Laptop Groups

Filters laptop groups by shared characteristics or membership.

## Endpoint

```
POST /laptopGroup/list
```

## Authentication

Required – valid JWT.

## Request Body

All fields are optional. Send only the filters you need.

```json
{
  "groupName": "string",
  "groupIdentifier": "string",
  "screenSize": 15.6,
  "panelType": "IPS",
  "resolution": "1920x1080",
  "refreshRate": "144Hz",
  "ssd": 512,
  "ram": 16,
  "touch": true,
  "keyLight": true,
  "discrete": true,
  "laptopId": "string",
  "idList": ["string"],
  "publishedOnMarketplace": true,
  "sorters": {
    "groupName": 1
  }
}
```

### Filter behavior

- Text filters (`groupName`) use case-insensitive partial matching.
- `laptopId` checks both `itemList` and `variants[].laptopId`.
- `publishedOnMarketplace` filters groups that have at least one marketplace with `published: true`. Set to `true` to only return published groups, or omit to include all groups.
- `sorters` mirrors Mongo sort syntax where `1` is ascending and `-1` descending.

## Response

**Status Code:** `200 OK`

```json
{
  "itemList": [
    {
      "_id": "string",
      "groupIdentifier": "string",
      "groupName": "string",
      "processor": "string",
      "videocard": "string",
      "screenSize": 15.6,
      "resolution": "1920x1080",
      "panelType": "IPS",
      "variants": [],
      "marketplaces": [
        {
          "code": "instagram",
          "published": false,
          "description": "string"
        }
      ],
      "itemList": []
    }
  ],
  "pageInfo": {
    "pageIndex": 0,
    "pageSize": 0,
    "totalCount": 0
  }
}
```

`pageInfo` is currently a placeholder (no server-side pagination yet).

