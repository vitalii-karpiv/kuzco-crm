# Get Laptop Description

Retrieves the description or detailed specifications of a specific laptop by its ID.

## Endpoint

```
GET /laptop/description/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the laptop

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "description": "string",
  "specifications": "object"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "description": "High-performance business laptop with excellent display and long battery life",
  "specifications": {
    "processor": "Intel Core i7-11800H",
    "ram": "16GB DDR4",
    "storage": "512GB NVMe SSD",
    "display": "15.6\" FHD",
    "graphics": "Intel Iris Xe"
  }
}
```

