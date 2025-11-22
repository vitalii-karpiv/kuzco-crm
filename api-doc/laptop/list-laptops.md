# List Laptops

Retrieves a filtered and paginated list of laptops from the inventory.

## Endpoint

```
POST /laptop/list
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
      "brand": "Dell",
      "model": "XPS 15",
      "price": 1299.99,
      "state": "available"
    }
  ],
  "total": 150,
  "page": 1,
  "pageSize": 20
}
```

