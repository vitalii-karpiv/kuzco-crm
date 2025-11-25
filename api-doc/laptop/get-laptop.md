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
  "code": "string",
  "name": "string",
  "brand": "string",
  "model": "string",
  "submodel": "string",
  "sellPrice": "number",
  "state": "string",
  "imageUrl": "string",
  "characteristics": {
    "processor": "string",
    "videocard": "string",
    "discrete": true,
    "ssd": 1024,
    "ram": 32,
    "ports": ["USB-C", "Thunderbolt"],
    "screenSize": 15.6,
    "resolution": "3840x2400",
    "panelType": "IPS",
    "refreshRate": "60Hz",
    "touch": true,
    "keyLight": true,
    "battery": 85
  },
  "defects": [],
  "marketplaces": [
    { "name": "Amazon" }
  ]
}
```

## Example Response

```json
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
    "discrete": true,
    "ssd": 1024,
    "ram": 32,
    "ports": ["USB-C", "Thunderbolt"],
    "screenSize": 15.6,
    "resolution": "3840x2400",
    "panelType": "IPS",
    "refreshRate": "60Hz",
    "touch": true,
    "keyLight": true,
    "battery": 85
  },
  "defects": [],
  "marketplaces": [
    { "name": "Amazon" }
  ]
}
```

