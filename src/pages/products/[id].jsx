import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_THUMBNAIL =
  'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';

const ProductDetailsPage = ({ product }) => {
  const imageSrc = product?.thumbnail || DEFAULT_THUMBNAIL;
  const isInlineImage = imageSrc.startsWith('data:');

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
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-[#bfd9d3] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.06em] text-[#0f6e62] transition hover:border-[#0f6e62] hover:bg-[#eff9f7]"
              >
                Back to products
              </Link>

              <Link
                href="/products/addform"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#0f6e62] to-[#179b89] px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition hover:brightness-110"
              >
                Add another
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  let product = null;

  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const file = await fs.readFile(dbPath, 'utf8');
    const parsed = JSON.parse(file);
    const products = Array.isArray(parsed?.products) ? parsed.products : [];

    product =
      products.find((item) => String(item.id) === String(params?.id)) || null;
  } catch {
    product = null;
  }

  if (!product) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
}
