# Create Stock

Creates new stock records in the inventory system. Can create multiple stock items at once.

## Endpoint

```
POST /stock
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "items": [
    {
      "laptopId": "string",
      "quantity": "number",
      "location": "string",
      "status": "string"
    }
  ]
}
```

## Response

**Status Code:** `201 Created`

```json
[
  {
    "id": "string",
    "laptopId": "string",
    "quantity": "number",
    "location": "string",
    "status": "string"
  }
]
```

## Example Response

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "laptopId": "507f1f77bcf86cd799439012",
    "quantity": 10,
    "location": "Warehouse A",
    "status": "available"
  }
]
```

