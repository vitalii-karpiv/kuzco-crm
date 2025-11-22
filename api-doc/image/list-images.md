# List Images

Retrieves a list of images based on filter criteria.

## Endpoint

```
POST /image/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "filters": "object (optional)",
  "entityId": "string (optional)",
  "entityType": "string (optional)"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "items": []
}
```

## Example Response

```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "url": "https://s3.amazonaws.com/...",
      "filename": "laptop-image.jpg",
      "entityId": "507f1f77bcf86cd799439012",
      "entityType": "laptop"
    }
  ]
}
```

