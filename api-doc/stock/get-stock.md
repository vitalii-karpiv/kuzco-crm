# Get Stock

Retrieves detailed information about a specific stock record by its ID.

## Endpoint

```
GET /stock/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the stock record to retrieve

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
  "quantity": 10,
  "location": "Warehouse A",
  "status": "available"
}
```

