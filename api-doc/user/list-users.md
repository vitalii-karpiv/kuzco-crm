# List Users

Retrieves a list of all users in the system. This endpoint requires authentication. Returns all users in the system without pagination (consider adding pagination for large datasets). Password fields are excluded from the response. Empty array `[]` is returned if no users exist in the system.

## Endpoint

```
POST /user/list
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Request Body

No request body required.

## Response

**Status Code:** `200 OK`

```json
[
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "surname": "string",
    "phone": "string"
  }
]
```

## Example Response

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "email": "john.doe@example.com",
    "name": "John",
    "surname": "Doe",
    "phone": "+380501234567"
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "email": "jane.smith@example.com",
    "name": "Jane",
    "surname": "Smith",
    "phone": "+380501234568"
  },
  {
    "id": "507f1f77bcf86cd799439013",
    "email": "bob.johnson@example.com",
    "name": "Bob",
    "surname": "Johnson",
    "phone": "+380501234569"
  }
]
```

