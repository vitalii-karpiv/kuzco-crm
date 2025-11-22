# Delete User

Deletes a user from the system by their ID. This endpoint requires authentication. The `id` parameter must be a valid MongoDB ObjectId (24 hexadecimal characters). Returns HTTP 204 No Content on success with an empty response body. This is a destructive operation and cannot be undone. Consider implementing soft deletes (marking as inactive) instead of hard deletes in production. Implement proper authorization to ensure users can only delete their own account or have admin privileges. Consider cascading deletes for related data (user sessions, user-created content, etc.). May want to add confirmation mechanisms before allowing deletion. **Security Considerations:** Ensure proper authorization checks are in place, consider implementing soft deletes for data retention and audit purposes, handle related data appropriately (sessions, tokens, user-created content), log deletion events for security and compliance, and consider requiring additional confirmation for this destructive action.

## Endpoint

```
DELETE /user/:id
```

## Authentication

Required - User must be authenticated with a valid JWT token.

## Path Parameters

- `id` (string, required) - MongoDB ObjectId of the user to delete

## Response

**Status Code:** `204 No Content`

No response body returned.

