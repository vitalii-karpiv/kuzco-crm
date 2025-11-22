# Create Laptop

Creates a new laptop record in the inventory system.

## Endpoint

```
POST /laptop
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "brand": "string",
  "model": "string",
  "specifications": "object",
  "price": "number",
  "state": "string"
}
```

## Response

**Status Code:** `201 Created`

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
  "model": "XPS 15",
  "specifications": {
    "processor": "Intel Core i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "price": 1299.99,
  "state": "available"
}
```

