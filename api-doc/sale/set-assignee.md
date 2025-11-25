# Set Sale Assignee

Assigns or updates the assignee (sales person) for a sale.

## Endpoint

```
POST /sale/setAssignee
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "assignee": "string"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "assignee": "string",
  "updatedAt": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "assignee": "507f1f77bcf86cd799439014",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

