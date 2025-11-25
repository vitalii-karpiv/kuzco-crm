# Get Revenue and Earnings

Retrieves revenue and earnings data for a specified date range.

## Endpoint

```
POST /finance/revenueAndEarnings
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "from": "string",
  "to": "string"
}
```

Date format should be ISO 8601 (e.g., "2024-01-01T00:00:00Z").

## Response

**Status Code:** `200 OK`

```json
{
  "revenue": "number",
  "earnings": "number",
  "profit": "number",
  "expenses": "number"
}
```

## Example Response

```json
{
  "revenue": 125000.00,
  "earnings": 45000.00,
  "profit": 35000.00,
  "expenses": 10000.00
}
```

