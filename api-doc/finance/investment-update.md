# Update Investment

Updates an existing investment record.

## Endpoint

```
PATCH /finance/investment
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "amount": "number (optional)",
  "description": "string (optional)",
  "type": "string (optional)",
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
  "type": "string",
  "date": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "amount": 55000.00,
  "description": "Initial capital investment - Updated",
  "type": "equity",
  "date": "2024-01-01T00:00:00Z"
}
```

