# Delete Laptop

Deletes a laptop record from the inventory by its ID.

## Endpoint

```
DELETE /laptop/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the laptop to delete

## Response

**Status Code:** `200 OK`

No response body returned.

