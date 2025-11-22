# Delete Sale

Deletes a sale record from the system by its ID. The userId is required in the request body for audit purposes.

## Endpoint

```
DELETE /sale/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the sale to delete

## Request Body

```json
{
  "userId": "string"
}
```

The userId is extracted from the authenticated request for audit tracking.

## Response

**Status Code:** `200 OK`

No response body returned.

