# Delete Image

Deletes an image from the system by its ID.

## Endpoint

```
DELETE /image/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the image to delete

## Response

**Status Code:** `200 OK`

```json
{
  "message": "string"
}
```

## Example Response

```json
{
  "message": "Image deleted successfully"
}
```

