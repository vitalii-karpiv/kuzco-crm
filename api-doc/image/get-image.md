# Get Image

Retrieves a specific image by its ID. This endpoint redirects to the public S3 URL for the image.

## Endpoint

```
GET /image/:id
```

## Authentication

Not required (public endpoint)

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the image

## Response

**Status Code:** `302 Found` (Redirect)

Redirects to the public S3 URL of the image.

## Example

When you access `GET /image/507f1f77bcf86cd799439011`, you will be redirected to the actual image URL (e.g., `https://kuzco-images.s3.amazonaws.com/...`).

