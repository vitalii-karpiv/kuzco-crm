## List Laptop Groups (Public)

Returns laptop groups for the public catalog. This is a **public** endpoint and does **not** require authentication.  
Filters are applied on group-level attributes (title, display) and variant-level attributes (RAM, SSD, price).

## Endpoint

```
POST /laptopGroup/list/public
```

## Authentication

Not required (public endpoint).

## Request Body

All fields are optional. Send only the filters you need.

```json
{
  "title": "string (optional, partial match, case-insensitive)",
  "priceFrom": 25000,
  "priceTo": 45000,
  "ramList": [8, 16],
  "ssdList": [256, 512],
  "screenSizeList": [13.3, 15.6],
  "resolutionList": ["1920x1080"],
  "panelType": ["IPS", "OLED"]
}
```

### Filter behavior

- **title**: partial, case-insensitive match against the laptop group `title`.
- **screenSizeList**: matches groups where `screenSize` is in the provided list.
- **resolutionList**: matches groups where `resolution` is in the provided list.
- **panelType**: matches groups where `panelType` is in the provided list.
- **ramList / ssdList**: match groups having at least one variant with `ram` / `ssd` value from the given list.
- **priceFrom / priceTo**: match groups having at least one variant with `price` between the given bounds (inclusive).

## Response

**Status Code:** `200 OK`

```json
{
  "itemList": [
    {
      "_id": "string",
      "groupIdentifier": "string",
      "groupName": "string",
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
          "ram": 16,
          "ssd": 512,
          "touch": false,
          "battery": "excellent",
          "condition": "A+",
          "price": 28000,
          "itemList": ["string"]
        }
      ],
      "marketplaces": [
        {
          "code": "instagram",
          "published": false,
          "description": "string"
        }
      ],
      "note": "string"
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


