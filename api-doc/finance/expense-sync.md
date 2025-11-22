# Sync Expenses

Synchronizes expenses with external systems or recalculates expense-related data.

## Endpoint

```
POST /finance/expense/sync
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "expenseIds": ["string"]
}
```

## Response

**Status Code:** `200 OK`

No response body returned.

