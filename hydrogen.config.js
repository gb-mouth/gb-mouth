import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
    storefrontApiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  },
});
