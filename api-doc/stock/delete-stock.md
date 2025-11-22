# Delete Stock

Deletes a stock record from the inventory by its ID.

## Endpoint

```
DELETE /stock/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the stock record to delete

## Response

**Status Code:** `204 No Content`

No response body returned.

