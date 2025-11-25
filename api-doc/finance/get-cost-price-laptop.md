# Get Cost Price Per Laptop

Calculates and retrieves the cost price for a specific laptop including all associated expenses.

## Endpoint

```
GET /finance/costPrice/laptop/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the laptop

## Response

**Status Code:** `200 OK`

```json
{
  "laptopId": "string",
  "costPrice": "number",
  "breakdown": "object"
}
```

## Example Response

```json
{
  "laptopId": "507f1f77bcf86cd799439011",
  "costPrice": 850.00,
  "breakdown": {
    "purchase": 700.00,
    "shipping": 50.00,
    "customs": 100.00
  }
}
```

