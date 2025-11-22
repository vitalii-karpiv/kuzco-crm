# Create Balance

Creates a new balance record for financial tracking.

## Endpoint

```
POST /finance/balance
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "amount": "number",
  "type": "string",
  "date": "string",
  "description": "string"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "amount": "number",
  "type": "string",
  "date": "string",
  "description": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "amount": 15000.00,
  "type": "cash",
  "date": "2024-01-15T10:00:00Z",
  "description": "Monthly balance"
}
```

