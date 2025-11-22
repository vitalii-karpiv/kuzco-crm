# Update User

Updates information for an existing user. This endpoint requires authentication. The `id` field is required and must be a valid MongoDB ObjectId. All other fields are optional - only include fields you want to update. Phone number must be in Ukrainian format when provided. Email must be unique in the system when updated. Password update is not currently supported through this endpoint (see TODO in code). Consider implementing authorization to ensure users can only update their own profile. Unchanged fields will retain their previous values.

## Endpoint

```
PATCH /user
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

```json
{
  "id": "string",
  "email": "string (optional)",
  "name": "string (optional)",
  "surname": "string (optional)",
  "phone": "string (optional)"
}
```

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
  "email": "john.new@example.com",
  "name": "Jonathan",
  "surname": "Doe-Smith",
  "phone": "+380509876543"
}
```

