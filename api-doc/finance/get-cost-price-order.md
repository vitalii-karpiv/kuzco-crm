# Get Cost Price For Order

Calculates and retrieves the total cost price for a specific order including all associated expenses.

## Endpoint

```
GET /finance/costPrice/order/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the order

## Response

**Status Code:** `200 OK`

```json
{
  "orderId": "string",
  "costPrice": "number",
  "breakdown": "object"
}
```

## Example Response

```json
{
  "orderId": "507f1f77bcf86cd799439011",
  "costPrice": 2550.00,
  "breakdown": {
    "laptops": 2100.00,
    "shipping": 150.00,
    "customs": 300.00
  }
}
```

