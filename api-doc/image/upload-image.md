# Upload Image

Uploads an image file to the system. This is a public endpoint that accepts multipart/form-data with an image file.

## Endpoint

```
POST /image/upload
```

## Authentication

Not required (public endpoint)

## Request Body

Multipart/form-data with the following fields:
- `image` (file, required) - The image file to upload
- Additional metadata fields as needed

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "url": "string",
  "filename": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "https://s3.amazonaws.com/...",
  "filename": "laptop-image.jpg"
}
```

