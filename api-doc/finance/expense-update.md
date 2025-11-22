# Update Expense

Updates an existing expense record.

## Endpoint

```
PATCH /finance/expense
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "amount": "number (optional)",
  "description": "string (optional)",
  "category": "string (optional)",
  "date": "string (optional)"
}
```

All fields except `id` are optional. Only include fields you want to update.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "amount": "number",
  "description": "string",
  "category": "string",
  "date": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "amount": 1600.00,
  "description": "Office supplies - Updated",
  "category": "operational",
  "date": "2024-01-15T10:00:00Z"
}
```

