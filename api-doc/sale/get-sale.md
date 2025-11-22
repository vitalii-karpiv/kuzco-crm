# Get Sale

Retrieves detailed information about a specific sale by its ID.

## Endpoint

```
GET /sale/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the sale to retrieve

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "customerId": "string",
  "laptopId": "string",
  "salePrice": "number",
  "saleDate": "string",
  "status": "string",
  "assignee": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "customerId": "507f1f77bcf86cd799439012",
  "laptopId": "507f1f77bcf86cd799439013",
  "salePrice": 1299.99,
  "saleDate": "2024-01-15T10:00:00Z",
  "status": "completed",
  "assignee": "507f1f77bcf86cd799439014"
}
```

