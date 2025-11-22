# Sync Balance

Synchronizes all balance records and recalculates financial totals.

## Endpoint

```
POST /finance/balance/sync
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

No request body required.

## Response

**Status Code:** `200 OK`

```json
{
  "synced": "boolean",
  "totalBalance": "number"
}
```

## Example Response

```json
{
  "synced": true,
  "totalBalance": 45000.00
}
```

