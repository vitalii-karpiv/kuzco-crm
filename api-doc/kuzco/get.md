# Get Kuzco

Retrieves the current Kuzco system configuration.

## Endpoint

```
GET /kuzco
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

No request body required.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "configuration": "object",
  "initialized": "boolean"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "configuration": {
    "version": "1.0",
    "settings": {}
  },
  "initialized": true
}
```

