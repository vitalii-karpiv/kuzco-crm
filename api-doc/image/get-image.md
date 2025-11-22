# Get Image

Retrieves a specific image by its ID. This endpoint redirects to a signed URL for the image.

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

Redirects to the signed URL of the image.

## Example

When you access `GET /image/507f1f77bcf86cd799439011`, you will be redirected to the actual image URL (e.g., a signed S3 URL).

