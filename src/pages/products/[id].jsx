import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';

const DEFAULT_THUMBNAIL =
  'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';

const ProductDetailsPage = ({ product }) => {
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [isBuying, setIsBuying] = useState(false);
  const imageSrc = product?.thumbnail || DEFAULT_THUMBNAIL;
  const isInlineImage = imageSrc.startsWith('data:');

  const handleBuy = async () => {
    setIsBuying(true);
    setPurchaseMessage('');

    try {
      const res = await fetch(`/api/products/${product.id}/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error('Buy request failed.');
      }

      const data = await res.json();
      setPurchaseMessage(
        `Purchased. Running total: $${Number(data.totalAmount || 0).toFixed(2)}`,
      );
    } catch {
      setPurchaseMessage('Could not complete purchase. Please try again.');
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-[#cfe4e0] bg-white shadow-[0_20px_42px_-28px_rgba(15,61,58,0.65)]">
        <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-80 bg-linear-to-b from-[#f3fffb] to-[#edf5ff] p-4 sm:p-6">
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              unoptimized={isInlineImage}
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-[#e6f7f4] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#0f6e62]">
              {product.category}
            </span>

            <h1 className="mt-3 text-2xl font-black leading-tight text-[#123a36] sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 text-3xl font-black text-[#0f6e62]">
              ${product.price}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#5f7d79] sm:text-base">
              {product.description ||
                'No description available for this product.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleBuy}
                disabled={isBuying}
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#123a36] to-[#0f6e62] px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isBuying ? 'Processing...' : 'Buy Product'}
              </button>

              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-[#bfd9d3] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.06em] text-[#0f6e62] transition hover:border-[#0f6e62] hover:bg-[#eff9f7]"
              >
                Back to products
              </Link>

              <Link
                href={`/products/edit/${product.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-[#123a36]/30 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.06em] text-[#123a36] transition hover:border-[#123a36] hover:bg-[#f4fbfa]"
              >
                Edit Product
              </Link>

              <Link
                href="/products/addform"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#0f6e62] to-[#179b89] px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition hover:brightness-110"
              >
                Add another
              </Link>
            </div>

            {purchaseMessage ? (
              <p className="mt-4 rounded-xl bg-[#e8f7f3] px-4 py-2 text-sm font-bold text-[#0f6e62]">
                {purchaseMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;

export async function getStaticPaths() {
  try {
    await dbConnect();
    const products = await Product.find({}, '_id').limit(20).lean();

    return {
      paths: products.map((item) => ({
        params: { id: item._id.toString() },
      })),
      fallback: 'blocking',
    };
  } catch {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const found = await Product.findById(params?.id).lean();
    const product = found
      ? {
          id: found._id.toString(),
          title: found.title,
          price: found.price,
          category: found.category,
          description: found.description,
          thumbnail: found.thumbnail,
          stock: found.stock,
        }
      : null;

    if (!product) {
      return {
        notFound: true,
        revalidate: 15,
      };
    }

    return {
      props: {
        product,
      },
      revalidate: 300,
    };
  } catch {
    return {
      notFound: true,
      revalidate: 300,
    };
  }
}
