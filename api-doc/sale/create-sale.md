# Create Sale

Creates a new sale record in the system.

## Endpoint

```
POST /sale
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "customerId": "string",
  "laptopId": "string",
  "salePrice": "number",
  "saleDate": "string",
  "status": "string"
}
```

## Response

**Status Code:** `201 Created`

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
  "salePrice": 1299.99,
  "saleDate": "2024-01-15T10:00:00Z",
  "status": "pending"
}
```

