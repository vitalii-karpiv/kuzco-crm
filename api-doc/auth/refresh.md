# Refresh Token

Refreshes the access token using a refresh token. The refresh token can be provided in the request body or will be automatically read from the cookie. Returns a new access token and sets a new refresh token cookie.

## Endpoint

```
GET /auth/refresh
```

## Authentication

Not required (public endpoint)

## Request Body

```json
{
  "refreshToken": "string (optional)"
}
```

The `refreshToken` field is optional. If not provided in the body, it will be read from the cookie automatically.

## Response

**Status Code:** `200 OK`

```json
{
  "accessToken": "string"
}
```

**Cookies Set:**
- `refreshToken` - New refresh token (HTTP-only, secure, SameSite=none, expires in 30 days)

## Example Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

