# Get Order

Retrieves detailed information about a specific order by its ID.

## Endpoint

```
GET /order/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the order to retrieve

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
  "laptopIds": ["507f1f77bcf86cd799439013"],
  "totalAmount": 1299.99,
  "orderDate": "2024-01-15T10:00:00Z",
  "status": "completed"
}
```

