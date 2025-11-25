# List Images

Retrieves a list of images for a specific laptop or laptop group. At least one identifier should be provided to limit the result set.

## Endpoint

```
POST /image/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "laptopId": "string (optional)",
  "groupId": "string (optional)"
}
```

- `laptopId` – Mongo ObjectId of the laptop whose images should be returned.
- `groupId` – Mongo ObjectId of the laptop group whose images should be returned.

If both fields are provided, the images must match both identifiers.

## Response

**Status Code:** `200 OK`

Array of image objects with permanent, public URLs.

```json
[
  {
    "id": "674379893df8a7c6d175ab42",
    "s3Url": "https://kuzco-images.s3.amazonaws.com/laptops/development/656a3cb10c3e3f0022225555/1732448771677.jpg"
  }
]
```

## Example Response

```json
[
  {
    "id": "674379893df8a7c6d175ab42",
    "s3Url": "https://kuzco-images.s3.amazonaws.com/group/development/65aa2bc83df8a7c6d111aa00/1732448771677.jpg"
  }
]
```

