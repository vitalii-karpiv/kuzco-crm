# Set Parent Expense

Sets a parent expense for hierarchical expense organization. Used to create parent-child relationships between expenses.

## Endpoint

```
POST /finance/expense/setParent
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "parentId": "string"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "parentId": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "parentId": "507f1f77bcf86cd799439012"
}
```

