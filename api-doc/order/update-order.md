# Update Order

Updates information for an existing order.

## Endpoint

```
PATCH /order
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "customerId": "string (optional)",
  "laptopIds": "[string] (optional)",
  "totalAmount": "number (optional)",
  "status": "string (optional)"
}
```

All fields except `id` are optional. Only include fields you want to update.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "customerId": "string",
  "laptopIds": ["string"],
  "totalAmount": "number",
  "orderDate": "string",
  "status": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "customerId": "507f1f77bcf86cd799439012",
  "laptopIds": ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"],
  "totalAmount": 2599.98,
  "orderDate": "2024-01-15T10:00:00Z",
  "status": "processing"
}
```

