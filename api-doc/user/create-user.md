# Create User

Creates a new user account in the system. Phone number must be in Ukrainian format (validated with `IsPhoneNumber("UA")`). Email must be unique in the system. Password is hashed before storage (not returned in response). All fields are required and cannot be empty.

## Endpoint

```
POST /user
```

## Authentication

Required - User must be authenticated with a valid JWT token.

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

**Status Code:** `201 Created`

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

