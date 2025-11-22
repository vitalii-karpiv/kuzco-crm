# List Expenses

Retrieves a filtered and paginated list of expenses.

## Endpoint

```
POST /finance/expense/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "filters": "object (optional)",
  "sort": "object (optional)",
  "pagination": "object (optional)"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "items": [],
  "total": 0,
  "page": 0,
  "pageSize": 0
}
```

## Example Response

```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "amount": 1500.50,
      "description": "Office supplies",
      "category": "operational",
      "date": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pageSize": 20
}
```

