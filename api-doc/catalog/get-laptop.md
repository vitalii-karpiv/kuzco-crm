# Get Laptop

Retrieves detailed information about a specific laptop from the public catalog by its ID. This is a public endpoint that does not require authentication.

## Endpoint

```
GET /catalog/laptops/:id
```

## Authentication

Not required (public endpoint)

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the laptop to retrieve

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "price": "number",
  "specifications": "object",
  "images": []
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "brand": "Dell",
  "model": "XPS 15",
  "price": 1299.99,
  "specifications": {
    "processor": "Intel Core i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "images": ["image-id-1", "image-id-2"]
}
```

