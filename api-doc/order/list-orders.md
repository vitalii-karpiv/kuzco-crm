# List Orders

Retrieves a filtered and paginated list of orders.

## Endpoint

```
POST /order/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "filters": "object (optional)",
  "sort": "object (optional)",
  "pagination": "object (optional)"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "items": [],
  "total": 0,
  "page": 0,
  "pageSize": 0
}
```

## Example Response

```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "customerId": "507f1f77bcf86cd799439012",
      "totalAmount": 1299.99,
      "orderDate": "2024-01-15T10:00:00Z",
      "status": "completed"
    }
  ],
  "total": 75,
  "page": 1,
  "pageSize": 20
}
```

