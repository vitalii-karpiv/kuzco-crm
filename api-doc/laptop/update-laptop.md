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
  "serviceTag": "string (optional)",
  "limitPrice": 700,
  "assignee": "656a3cb10c3e3f0022225555",
  "laptopGroupId": "656a3cb10c3e3f0022225556",
  "sellPrice": 1100,
  "toBuy": ["charger"],
  "bought": [],
  "defects": ["scratch"],
  "complectation": ["charger", "bag"],
  "note": "Ready to publish",
  "imageUrl": "https://kuzco-images.s3.amazonaws.com/laptops/development/507f1f77bcf86cd799439011/1732448771777.jpg",
  "techCheck": {
    "status": "PASSED",
    "comments": "All good"
  },
  "characteristics": {
    "processor": "Intel Core i7-12700H",
    "videocard": "NVIDIA RTX 3050 Ti",
    "ssd": 1024,
    "ram": 32
  },
  "marketplaces": [
    { "name": "Amazon", "url": "https://amazon.com/..." }
  ]
}
```

All fields except `id` are optional. Only include fields you want to update.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "code": "string",
  "name": "string",
  "brand": "string",
  "model": "string",
  "submodel": "string",
  "sellPrice": 1100,
  "state": "SELLING",
  "imageUrl": "https://kuzco-images.s3.amazonaws.com/laptops/development/507f1f77bcf86cd799439011/1732448771777.jpg",
  "characteristics": {
    "processor": "Intel Core i7-12700H",
    "videocard": "NVIDIA RTX 3050 Ti",
    "discrete": true,
    "ssd": 1024,
    "ram": 32
  }
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "code": "LPT-001",
  "name": "Dell XPS 15",
  "brand": "Dell",
  "model": "XPS 15 (Updated)",
  "submodel": "9520",
  "sellPrice": 1499.99,
  "state": "SELLING",
  "imageUrl": "https://kuzco-images.s3.amazonaws.com/laptops/development/507f1f77bcf86cd799439011/1732448771777.jpg",
  "characteristics": {
    "processor": "Intel Core i7-12700H",
    "videocard": "NVIDIA RTX 3050 Ti",
    "discrete": true,
    "ssd": 1024,
    "ram": 32,
    "ports": ["USB-C", "Thunderbolt"],
    "screenSize": 15.6
  },
  "defects": ["scratch"],
  "marketplaces": [
    { "name": "Amazon" }
  ]
}
```

