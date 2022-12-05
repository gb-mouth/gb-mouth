import { Suspense } from "react";
import FeaturedCollections from "../components/sections/FeaturedCollections.server";
import { Layout } from "../components/Layout.server";
import { TopView } from "../components/sections/TopView.server";

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
