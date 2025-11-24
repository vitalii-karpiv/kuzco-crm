# Upload Image

Uploads an image file to the system. This is a public endpoint that accepts multipart/form-data with an image file and associates it either with a specific laptop or with a laptop group.

## Endpoint

```
POST /image/upload
```

## Authentication

Not required (public endpoint)

## Request Body

Multipart/form-data with the following fields:
- `image` (file, required) – Binary image data
- `laptopId` (string, optional) – Mongo ObjectId of the laptop the image belongs to
- `groupId` (string, optional) – Mongo ObjectId of the laptop group the image belongs to

Exactly one of `laptopId` or `groupId` must be provided.

### Example

```
POST /image/upload
Content-Type: multipart/form-data

image=<file>
laptopId=656a3cb10c3e3f0022225555
```

## Response

**Status Code:** `200 OK`

Returns the saved image document.

```json
{
  "id": "674379893df8a7c6d175ab42",
  "s3Key": "laptops/development/656a3cb10c3e3f0022225555/1732448771677.jpg",
  "s3Url": "https://kuzco-images.s3.amazonaws.com/laptops/development/656a3cb10c3e3f0022225555/1732448771677.jpg",
  "contentType": "image/jpeg",
  "laptopId": "656a3cb10c3e3f0022225555",
  "groupId": null,
  "originalName": "top-lid.heic"
}
```

## Example Response

```json
{
  "id": "674379893df8a7c6d175ab55",
  "s3Key": "group/development/65aa2bc83df8a7c6d111aa00/1732448771678.jpg",
  "s3Url": "https://kuzco-images.s3.amazonaws.com/group/development/65aa2bc83df8a7c6d111aa00/1732448771678.jpg",
  "contentType": "image/jpeg",
  "laptopId": null,
  "groupId": "65aa2bc83df8a7c6d111aa00",
  "originalName": "variants.png"
}
```

