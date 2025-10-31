import { Link, Image, Money } from "@shopify/hydrogen";

export default function ProductCard({ product }) {
  const variant = product.variants?.nodes?.[0];
  const { priceV2: price, compareAtPriceV2: compareAtPrice, image } = variant || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  // 予約商品情報を取得
  const isPreOrder = product.metafield_isPreOrder?.value === 'true';
  const releaseDate = product.metafield_releaseDate?.value;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isPreOrder ? (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-blue-600 text-xs">
              予約受付中
            </label>
          ) : isDiscounted && (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </label>
          )}
          {isPreOrder && (
            <div className="absolute top-0 left-0 m-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              予約
            </div>
          )}
          {image ? (
            <Image
              data={image}
              alt="Alt Tag"
            />
          ) : (
            <div className="bg-gray-200 aspect-square w-full rounded" />
          )}
        </div>
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          {isPreOrder && releaseDate && (
            <p className="text-xs text-blue-600">
              発売予定: {new Date(releaseDate).toLocaleDateString('ja-JP', {
                month: 'short',
                day: 'numeric'
              })}
            </p>
          )}
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
