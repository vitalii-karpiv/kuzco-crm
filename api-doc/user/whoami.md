# Who Am I

Returns information about the currently authenticated user. This endpoint requires authentication. The user ID is automatically extracted from the JWT token in the request. Returns the full User model including the hashed password. Useful for retrieving current user's profile information. The password returned is hashed (bcrypt) but consider excluding it from the response in production for better security.

## Endpoint

```
GET /user/whoami
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Parameters

None required. The user ID is extracted from the authentication token.

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "email": "string",
  "password": "string",
  "name": "string",
  "surname": "string",
  "phone": "string"
}
```

## Example Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "john.doe@example.com",
  "password": "$2b$10$XYZ123...", 
  "name": "John",
  "surname": "Doe",
  "phone": "+380501234567"
}
```

