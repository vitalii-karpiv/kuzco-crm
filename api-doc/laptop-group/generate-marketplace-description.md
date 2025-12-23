# Generate Marketplace Description

Generates a marketplace-specific description for a laptop group using predefined templates. The description is automatically populated with laptop group data and saved to the group's marketplace configuration.

## Endpoint

```
POST /laptopGroup/marketplace/generateDescription
```

## Authentication

Required – caller must send a valid JWT.

## Request Body

```json
{
  "id": "string",
  "code": "instagram"
}
```

### Fields

- `id` (required): MongoDB ID of the laptop group
- `code` (required): Marketplace code. Currently supported values:
  - `"instagram"` - Instagram marketplace template

## Description Generation

The description is generated from a template that includes placeholders for:
- `group.title` - Laptop group title
- `group.processor` - Processor name
- `group.videocard` - Video card name
- `group.ram` - RAM size (from first variant)
- `group.ssd` - SSD size (from first variant)
- `group.battery` - Battery health percentage (calculated from battery condition)
- `group.screen` - Screen information (size, resolution, panel type)
- `group.price` - Lowest price from all variants

The template uses the first variant's data for RAM, SSD, and battery information. The price is the minimum price across all variants.

## Response

**Status Code:** `200 OK`

```json
{
  "_id": "string",
  "groupIdentifier": "string",
  "groupName": "string",
  "title": "string",
  "processor": "string",
  "videocard": "string",
  "marketplaces": [
    {
      "code": "instagram",
      "published": false,
      "description": "💻 Dell XPS 15 9520\n\nХарактеристики:\n\n⚙️ Intel Core i7-12700H\n🚀 RTX 3050 Ti\n💾 16 / 512\n🔋 95\n🖥️ 15.6\" 1920x1080 IPS\n\n✅ Гарантія: 6 місяців\n\n📦 Доставка: Нова Пошта, Укр Пошта, Meest. Можлива оплата після отримання, або повна передоплата.\n\n- У комплекті ноутбук та оригінальний зарядний пристрій\n- Є можливість зміни конфігурації ноутбука (RAM/SSD)\n\n💰 Ціна: 28000 грн\n\nДля КОНСУЛЬТАЦІЇ / ЗАМОВЛЕННЯ пишіть нам в ДІРЕКТ або Viber/Telegram"
    }
  ],
  "variants": [],
  ...
}
```

The API returns the updated laptop group document with the generated description saved in the marketplace configuration. If the marketplace doesn't exist for the group, it will be created automatically.

## Error Responses

**Status Code:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Laptop group not found.",
  "paramMap": {
    "id": "string"
  }
}
```

**Status Code:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "Template not found for marketplace code: {code}",
  "paramMap": {
    "code": "string"
  }
}
```

