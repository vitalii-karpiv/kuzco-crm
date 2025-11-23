# Remove Laptop from Group

Detaches a laptop from its current group, deletes the associated variant entry, and clears the `laptopGroupId` on the laptop document.

## Endpoint

```
POST /laptopGroup/removeLaptop
```

## Authentication

Required – valid JWT.

## Request Body

```json
{
  "groupId": "string",
  "laptopId": "string"
}
```

Both IDs must be valid Mongo ObjectIds. The laptop has to belong to the specified group; otherwise the service simply persists the group without the laptop reference.

## Behavior

1. Loads the target group by `groupId`.
2. Removes the `laptopId` from the group's `itemList`.
3. Removes the variant whose `laptopId` matches.
4. Saves the modified group.
5. Updates the laptop record, setting `laptopGroupId` to `null`.

## Response

**Status Code:** `200 OK`

Returns the updated laptop group document (same shape as `GET /laptopGroup/:id`).

