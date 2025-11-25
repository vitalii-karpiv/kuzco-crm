# Update Sale

Updates information for an existing sale.

## Endpoint

```
PATCH /sale
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "customerId": "string (optional)",
  "laptopId": "string (optional)",
  "salePrice": "number (optional)",
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
  "laptopId": "string",
  "salePrice": "number",
  "saleDate": "string",
  "status": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "customerId": "507f1f77bcf86cd799439012",
  "laptopId": "507f1f77bcf86cd799439013",
  "salePrice": 1399.99,
  "saleDate": "2024-01-15T10:00:00Z",
  "status": "completed"
}
```

