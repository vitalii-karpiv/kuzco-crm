# Create Investment

Creates a new investment record in the finance system.

## Endpoint

```
POST /finance/investment
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "amount": "number",
  "description": "string",
  "type": "string",
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
  "type": "string",
  "date": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "amount": 50000.00,
  "description": "Initial capital investment",
  "type": "equity",
  "date": "2024-01-01T00:00:00Z"
}
```

