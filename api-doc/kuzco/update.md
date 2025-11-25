# Update Kuzco

Updates the Kuzco system configuration.

## Endpoint

```
PUT /kuzco
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "configuration": "object"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "configuration": "object",
  "updated": "boolean"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "configuration": {
    "version": "1.1",
    "settings": {}
  },
  "updated": true
}
```

