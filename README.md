# JavaScript Example

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template in JavaScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/hello-world-js?file=package.json)

[Run this template in TypeScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/hello-world-js?file=package.json)

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher
- Yarn

```bash
npm init @shopify/hydrogen@latest --template hello-world-ts
```

### Environment Setup

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
SHOPIFY_STOREFRONT_API_VERSION=2022-07
```

**Note:** Never commit the `.env` file to version control. It contains sensitive credentials.

## Building for production

```bash
yarn build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `yarn preview`:

```bash
yarn build
yarn preview
```
