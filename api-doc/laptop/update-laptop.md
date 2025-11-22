# Update Laptop

Updates information for an existing laptop.

## Endpoint

```
PATCH /laptop
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "brand": "string (optional)",
  "model": "string (optional)",
  "specifications": "object (optional)",
  "price": "number (optional)",
  "state": "string (optional)"
}
```

All fields except `id` are optional. Only include fields you want to update.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "specifications": "object",
  "price": "number",
  "state": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "brand": "Dell",
  "model": "XPS 15 (Updated)",
  "specifications": {
    "processor": "Intel Core i7",
    "ram": "32GB",
    "storage": "1TB SSD"
  },
  "price": 1499.99,
  "state": "available"
}
```

