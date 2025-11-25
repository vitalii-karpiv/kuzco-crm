# Get Customer

Retrieves information about a specific customer by their ID.

## Endpoint

```
GET /customer/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the customer to retrieve

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

