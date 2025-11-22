# Initialize Kuzco

Initializes the Kuzco system configuration. This is typically used for initial setup.

## Endpoint

```
POST /kuzco
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "configuration": "object"
}
```

## Response

**Status Code:** `201 Created`

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

