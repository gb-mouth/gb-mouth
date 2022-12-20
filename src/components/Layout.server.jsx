import {
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
  Link,
  Seo,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./global/Header.client";
import { TopLoading } from "./TopLoading.client";
import { TopView } from "./sections/TopView.server";

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({ children }) {
  const { pathname } = useUrl();
  const isHome = pathname === "/";
  var showModal = false;

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  if (isHome) {
    showModal = true;
  }

  const handleClick = () => {
    console.log('handleClick');
    showModal = false;
  }

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <div className="flex flex-col min-h-screen antialiased bg-white">
        <div>
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header shop={shop} />
        {showModal &&
            <TopLoading />
        }
        {/* https://github.com/gb-mouth/docs/issues/31
          {isHome &&
          <TopView className="absolute top-0 block object-cover w-full h-full"/>
        } */}
        <main role="main" id="mainContent" className={`${isHome ? 'bg-black/80 text-white absolute' : ''} flex-grow -z-2`}>
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
