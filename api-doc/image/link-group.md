# Link Group

Links all images associated with a specific laptop to a laptop group. This allows laptop images to be associated with a group while maintaining their original laptop association.

## Endpoint

```
POST /image/linkGroup
```

## Authentication

Required (not a public endpoint)

## Request Body

```json
{
  "laptopId": "string (required)",
  "groupId": "string (required)"
}
```

- `laptopId` (string, required) – Mongo ObjectId of the laptop whose images should be linked
- `groupId` (string, required) – Mongo ObjectId of the laptop group to link the images to

### Example

```json
{
  "laptopId": "656a3cb10c3e3f0022225555",
  "groupId": "65aa2bc83df8a7c6d111aa00"
}
```

## Response

**Status Code:** `200 OK`

Returns the count of linked images and the updated image documents.

```json
{
  "count": 3,
  "images": [
    {
      "id": "674379893df8a7c6d175ab42",
      "s3Key": "laptops/development/656a3cb10c3e3f0022225555/1732448771677.jpg",
      "s3Url": "https://kuzco-images.s3.amazonaws.com/laptops/development/656a3cb10c3e3f0022225555/1732448771677.jpg",
      "contentType": "image/jpeg",
      "laptopId": "656a3cb10c3e3f0022225555",
      "groupId": "65aa2bc83df8a7c6d111aa00",
      "originalName": "top-lid.heic"
    },
    {
      "id": "674379893df8a7c6d175ab43",
      "s3Key": "laptops/development/656a3cb10c3e3f0022225555/1732448771678.jpg",
      "s3Url": "https://kuzco-images.s3.amazonaws.com/laptops/development/656a3cb10c3e3f0022225555/1732448771678.jpg",
      "contentType": "image/jpeg",
      "laptopId": "656a3cb10c3e3f0022225555",
      "groupId": "65aa2bc83df8a7c6d111aa00",
      "originalName": "bottom.jpg"
    },
    {
      "id": "674379893df8a7c6d175ab44",
      "s3Key": "laptops/development/656a3cb10c3e3f0022225555/1732448771679.jpg",
      "s3Url": "https://kuzco-images.s3.amazonaws.com/laptops/development/656a3cb10c3e3f0022225555/1732448771679.jpg",
      "contentType": "image/jpeg",
      "laptopId": "656a3cb10c3e3f0022225555",
      "groupId": "65aa2bc83df8a7c6d111aa00",
      "originalName": "keyboard.jpg"
    }
  ]
}
```

## Example Response (No Images Found)

If no images are found for the given laptopId, the endpoint returns an empty result:

```json
{
  "count": 0,
  "images": []
}
```

## Notes

- All images associated with the specified laptop will be linked to the group
- Images maintain both `laptopId` and `groupId` after linking
- If an image already has a `groupId`, it will be updated to the new groupId
- The operation is idempotent - calling it multiple times with the same parameters will have the same result
