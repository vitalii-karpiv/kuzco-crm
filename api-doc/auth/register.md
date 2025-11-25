# Register

Registers a new user account. Returns an access token and sets a refresh token cookie. Phone number must be in Ukrainian format. Email must be unique. Password is hashed before storage. The refresh token is set as an HTTP-only, secure cookie with SameSite=none for cross-site requests. Cookie expires in 30 days.

## Endpoint

```
POST /auth/register
```

## Authentication

Not required (public endpoint)

## Request Body

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "surname": "string",
  "phone": "string"
}
```

## Response

**Status Code:** `200 OK`

```json
{
  "accessToken": "string"
}
```

**Cookies Set:**
- `refreshToken` - HTTP-only, secure, SameSite=none, expires in 30 days

## Example Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

