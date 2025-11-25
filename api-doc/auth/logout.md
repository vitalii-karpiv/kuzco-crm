# Logout

Logs out the current user by invalidating their refresh token. The refresh token can be provided in the request body or will be automatically read from the cookie. Clears the refresh token cookie.

## Endpoint

```
POST /auth/logout
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "refreshToken": "string (optional)"
}
```

The `refreshToken` field is optional. If not provided in the body, it will be read from the cookie automatically.

## Response

**Status Code:** `204 No Content`

No response body returned.

**Cookies Cleared:**
- `refreshToken` - Cookie is removed

