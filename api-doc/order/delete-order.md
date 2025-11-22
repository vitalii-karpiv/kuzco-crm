# Delete Order

Deletes an order from the system by its ID.

## Endpoint

```
DELETE /order/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the order to delete

## Response

**Status Code:** `204 No Content`

No response body returned.

