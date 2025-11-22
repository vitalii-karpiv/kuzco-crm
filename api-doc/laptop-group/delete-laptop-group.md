# Delete Laptop Group

Removes a laptop group by ID.

## Endpoint

```
DELETE /laptopGroup/:id
```

## Authentication

Required – valid JWT.

## Path Parameters

- `id` (string, required) – Laptop group ID.

## Response

**Status Code:** `200 OK`

Empty body. A `404` error is returned if the group does not exist.

> **Note:** Removing a group does not yet clear `laptopGroupId` from member laptops. Handle that manually if needed.

