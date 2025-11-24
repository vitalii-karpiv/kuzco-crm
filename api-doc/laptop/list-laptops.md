# List Laptops

Retrieves a filtered and paginated list of laptops from the inventory with optional sorting.

## Endpoint

```
POST /laptop/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "filters": {
    "state": ["selling", "reserved"],
    "brand": ["Dell", "HP"],
    "priceFrom": 500,
    "priceTo": 1500,
    "assignee": "656a3cb10c3e3f0022225555"
  },
  "sorters": [
    { "field": "createdAt", "direction": -1 }
  ],
  "pagination": {
    "page": 0,
    "pageSize": 20
  }
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "itemList": [
    {
      "id": "507f1f77bcf86cd799439011",
      "code": "LPT-001",
      "name": "Dell XPS 15",
      "brand": "Dell",
      "model": "XPS 15",
      "submodel": "9520",
      "sellPrice": 1299.99,
      "state": "SELLING",
      "imageUrl": "https://kuzco-images.s3.amazonaws.com/laptops/development/507f1f77bcf86cd799439011/1732448771677.jpg"
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}
```

## Example Response

```json
{
  "itemList": [
    {
      "id": "507f1f77bcf86cd799439011",
      "code": "LPT-001",
      "name": "Dell XPS 15",
      "brand": "Dell",
      "model": "XPS 15",
      "submodel": "9520",
      "sellPrice": 1299.99,
      "state": "SELLING",
      "imageUrl": "https://kuzco-images.s3.amazonaws.com/laptops/development/507f1f77bcf86cd799439011/1732448771677.jpg",
      "characteristics": {
        "processor": "Intel Core i7-12700H",
        "videocard": "NVIDIA RTX 3050 Ti",
        "ssd": 1024,
        "ram": 32,
        "ports": ["USB-C", "Thunderbolt"],
        "screenSize": 15.6,
        "resolution": "3840x2400",
        "panelType": "IPS",
        "refreshRate": "60Hz",
        "touch": true
      },
      "defects": [],
      "marketplaces": [
        { "name": "Amazon" }
      ]
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}
```

