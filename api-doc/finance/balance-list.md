# List Balances

Retrieves a list of all balance records.

## Endpoint

```
POST /finance/balance/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

No request body required.

## Response

**Status Code:** `200 OK`

```json
{
  "items": []
}
```

## Example Response

```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "amount": 15000.00,
      "type": "cash",
      "date": "2024-01-15T10:00:00Z",
      "description": "Monthly balance"
    }
  ]
}
```

