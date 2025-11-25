# Create or Update Customer

Creates a new customer or updates an existing customer. This endpoint handles both create and update operations based on whether the customer ID is provided.

## Endpoint

```
POST /customer
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string (optional)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string (optional)"
}
```

If `id` is provided, the customer will be updated. If `id` is not provided, a new customer will be created.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380501234567",
  "address": "123 Main St, Kyiv"
}
```

