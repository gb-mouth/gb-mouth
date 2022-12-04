import { useShopQuery, Seo, gql, useLocalization, useUrl } from "@shopify/hydrogen";
import { Layout } from "../../components/Layout.server";
import { PRODUCT_CARD_FRAGMENT } from "../../lib/fragments";
import { PAGINATION_SIZE } from "../../lib/const";
import { PageHeader } from "../../components/global/PageHeader";
import { Section } from "../../components/elements/Section";
import { Suspense } from "react";
import { ProductGrid } from "../../components/product/ProductGrid.client";
import { PullDownButton } from "../../components/global/PullDownButton.client";

export default function AllProducts() {
  const { data: c } = useShopQuery({
    query: GET_CETEGORIES_QUERY,
    preload: true,
  });
  const category_data = c.productTypes.edges
  const categories = category_data.map(cateogry => {
    return cateogry.node
  });

  return (
    <Layout>
      <Seo type="page" data={{title: 'All Products'}} />
      <PageHeader heading="All Products" variant="allCollections" />
      <PullDownButton categories={categories}></PullDownButton>
      <Section>
        <Suspense>
          <AllProductsGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function AllProductsGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  let category = useUrl().searchParams.get("category");
  if (!category) {
    category = `product_type:*`
  } else {
    category = `product_type:${category}`
  }

  const {data} = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      pageBy: PAGINATION_SIZE,
      category: category
    },
    preload: true,
  });

  const products = data.products;

  return (
    <ProductGrid
      key="products"
      url={`/products?country=${countryCode}&category=${category}`}
      collection={{products}}
    />
  );
}

// API to paginate products
// @see templates/demo-store/src/components/product/ProductGrid.client.tsx
export async function api(request, {params, queryShop}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'POST'},
    });
  }

  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const category = url.searchParams.get('category');
  const {handle} = params;

  return await queryShop({
    query: PAGINATE_ALL_PRODUCTS_QUERY,
    variables: {
      handle,
      cursor,
      pageBy: PAGINATION_SIZE,
      country,
      category: category
    },
  });
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
    $category: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, query: $category, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const PAGINATE_ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage(
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
    $category: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, query: $category, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_CETEGORIES_QUERY = gql`
  query {
    productTypes(first:100) {
      edges {
        node
      }
    }
  }
`;
