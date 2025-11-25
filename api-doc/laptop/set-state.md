# Set Laptop State

Updates the state of a laptop (e.g., available, sold, reserved).

## Endpoint

```
POST /laptop/setState
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "state": "string"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "state": "string",
  "updatedAt": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "state": "sold",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

