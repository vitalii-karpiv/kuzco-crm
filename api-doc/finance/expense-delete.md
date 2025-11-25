# Delete Expense

Deletes an expense record by its ID.

## Endpoint

```
DELETE /finance/expense/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the expense to delete

## Response

**Status Code:** `200 OK`

No response body returned.

