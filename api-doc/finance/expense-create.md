# Create Expense

Creates a new expense record in the finance system.

## Endpoint

```
POST /finance/expense
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "amount": "number",
  "description": "string",
  "category": "string",
  "date": "string"
}
```

## Response

**Status Code:** `201 Created`

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
  "amount": 1500.50,
  "description": "Office supplies",
  "category": "operational",
  "date": "2024-01-15T10:00:00Z"
}
```

