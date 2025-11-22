# Update Stock

Updates information for an existing stock record.

## Endpoint

```
PATCH /stock
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "laptopId": "string (optional)",
  "quantity": "number (optional)",
  "location": "string (optional)",
  "status": "string (optional)"
}
```

All fields except `id` are optional. Only include fields you want to update.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "laptopId": "string",
  "quantity": "number",
  "location": "string",
  "status": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "laptopId": "507f1f77bcf86cd799439012",
  "quantity": 15,
  "location": "Warehouse B",
  "status": "available"
}
```

