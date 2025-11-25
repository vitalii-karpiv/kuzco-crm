# Delete Investment

Deletes an investment record by its ID.

## Endpoint

```
DELETE /finance/investment/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the investment to delete

## Response

**Status Code:** `200 OK`

No response body returned.

