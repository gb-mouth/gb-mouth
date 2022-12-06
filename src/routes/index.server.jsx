import { Suspense } from "react";
import FeaturedCollections from "../components/sections/FeaturedCollections.server";
import { Layout } from "../components/Layout.server";
import { TopView } from "../components/sections/TopView.server";
import { TopLoading } from "../components/TopLoading.client";

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <TopView height="full" top loading="eager" />
        <FeaturedCollections />
      </Suspense>
    </Layout>
  );
}
