# Toggle Marketplace Published Status

Toggles the published status of a laptop group for a specific marketplace. This allows you to control whether the laptop group is published or unpublished on the marketplace.

## Endpoint

```
POST /laptopGroup/marketplace/togglePublished
```

## Authentication

Required – caller must send a valid JWT.

## Request Body

```json
{
  "id": "string",
  "code": "instagram"
}
```

### Fields

- `id` (required): MongoDB ID of the laptop group
- `code` (required): Marketplace code. Currently supported values:
  - `"instagram"` - Instagram marketplace

## Behavior

- If the marketplace is currently `published: false`, it will be set to `published: true`
- If the marketplace is currently `published: true`, it will be set to `published: false`
- The marketplace must exist for the laptop group (it is created automatically when generating a description)

## Response

**Status Code:** `200 OK`

```json
{
  "_id": "string",
  "groupIdentifier": "string",
  "groupName": "string",
  "title": "string",
  "processor": "string",
  "videocard": "string",
  "marketplaces": [
    {
      "code": "instagram",
      "published": true,
      "description": "string"
    }
  ],
  "variants": [],
  ...
}
```

The API returns the updated laptop group document with the toggled published status.

## Error Responses

**Status Code:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Laptop group not found.",
  "paramMap": {
    "id": "string"
  }
}
```

**Status Code:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Marketplace not found for this laptop group.",
  "paramMap": {
    "id": "string",
    "code": "string"
  }
}
```

