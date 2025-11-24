# Create Laptop Group

Creates a new logical group used to bundle laptops that share the same core specs (name, CPU, GPU, display).

## Endpoint

```
POST /laptopGroup
```

## Authentication

Required – caller must send a valid JWT.

## Request Body

```json
{
  "groupName": "string",
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
      "ram": 16,
      "ssd": 512,
      "touch": false,
      "keyLight": true,
      "battery": 82,
      "price": 28000
    }
  ],
  "itemList": ["string"],
  "note": "string"
}
```

### Notes

- `groupName`, `processor`, `videocard`, `screenSize`, `resolution`, and `panelType` are required to generate a unique `groupIdentifier`.
- `title` defaults to the provided `groupName` but can be overridden later via the update endpoint.
- `variants` lets you describe pre-configured RAM/SSD/touch/keyLight/battery combos (plus price) for laptops already in inventory.
- `itemList` contains laptop IDs that should be immediately associated with the group.

## Response

**Status Code:** `201 Created`

```json
{
  "_id": "string",
  "groupIdentifier": "dell-xps-9520-i7-rtx3050-15.6-1920x1080-ips",
  "groupName": "Dell XPS 15 9520",
  "title": "Dell XPS 15 9520",
  "groupDescription": "Creator lineup",
  "imageUrl": "string",
  "processor": "Intel Core i7-12700H",
  "videocard": "RTX 3050 Ti",
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
      "battery": 82,
      "price": 28000
    }
  ],
  "itemList": ["string"],
  "note": "string"
}
```

The API returns the newly created MongoDB document. Each laptop listed in `itemList` automatically receives the `laptopGroupId` reference.

