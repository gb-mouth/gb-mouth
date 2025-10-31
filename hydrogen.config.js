import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN || 'gb-mouth.myshopify.com',
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN || '43f698e85ff68a13442c77704c829138',
    storefrontApiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION || '2022-07',
  },
});
