# Create Order

Creates a new order in the system.

## Endpoint

```
POST /order
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "customerId": "string",
  "laptopIds": ["string"],
  "totalAmount": "number",
  "orderDate": "string",
  "status": "string"
}
```

## Response

**Status Code:** `201 Created`

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
  "laptopIds": ["507f1f77bcf86cd799439013"],
  "totalAmount": 1299.99,
  "orderDate": "2024-01-15T10:00:00Z",
  "status": "pending"
}
```

