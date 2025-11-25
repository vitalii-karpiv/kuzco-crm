# List Laptops

Retrieves a list of laptops available in the public catalog. This is a public endpoint that does not require authentication. Returns paginated list of laptops with filtering and sorting options.

## Endpoint

```
POST /catalog/laptops
```

## Authentication

Not required (public endpoint)

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
      "specifications": {}
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

