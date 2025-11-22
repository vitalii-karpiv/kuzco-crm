# Get Laptop

Retrieves detailed information about a specific laptop by its ID.

## Endpoint

```
GET /laptop/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the laptop to retrieve

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "specifications": "object",
  "price": "number",
  "state": "string",
  "images": []
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "brand": "Dell",
  "model": "XPS 15",
  "specifications": {
    "processor": "Intel Core i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "price": 1299.99,
  "state": "available",
  "images": ["image-id-1", "image-id-2"]
}
```

