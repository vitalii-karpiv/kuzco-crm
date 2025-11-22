# Get User

Retrieves information about a specific user by their ID. This endpoint requires authentication. The `id` parameter must be a valid MongoDB ObjectId (24 hexadecimal characters). Password field is not included in the response. Returns only public user information. Consider implementing authorization checks if users should only view their own profile or have specific permissions.

## Endpoint

```
GET /user/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the user to retrieve

## Response

**Status Code:** `200 OK`

```json
{
  "id": "string",
  "email": "string",
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
  "name": "John",
  "surname": "Doe",
  "phone": "+380501234567"
}
```

