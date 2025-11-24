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
  "code": "string",
  "name": "string",
  "brand": "string",
  "model": "string",
  "submodel": "string (optional)",
  "sellPrice": 1200,
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
  }
}
```

## Response

**Status Code:** `201 Created`

```json
{
  "id": "string",
  "code": "string",
  "name": "string",
  "brand": "string",
  "model": "string",
  "submodel": "string",
  "sellPrice": 1200,
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
  }
}
```

