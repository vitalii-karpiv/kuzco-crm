# Remove Laptop from Group

Detaches a laptop from its current group, removes it from the associated variant, and clears the `laptopGroupId` on the laptop document. If the variant becomes empty, it is deleted.

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
2. Finds the variant whose `itemList` contains the `laptopId` and removes the ID from that list.
3. If the variant's `itemList` becomes empty, removes the variant from the group.
4. Saves the modified group.
5. Updates the laptop record, setting `laptopGroupId` to `null`.

## Response

**Status Code:** `200 OK`

Returns the updated laptop group document (same shape as `GET /laptopGroup/:id`).

