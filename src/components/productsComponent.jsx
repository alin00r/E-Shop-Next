'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_THUMBNAIL =
  'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';

const ProductsComponent = ({ products }) => {
  const [items, setItems] = useState(products || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setItems(products || []);
  }, [products]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:4000/products/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setItems((prev) => prev.filter((item) => item.id !== id));
        } else {
          setItems((prev) => prev.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error('Delete failed:', error);
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const handleFilter = async (category) => {
    setActiveCategory(category);

    if (category === 'all') {
      setItems(products || []);
      return;
    }

    const filtered = (products || []).filter(
      (item) => item.category === category,
    );
    setItems(filtered);
  };

  const filteredItems = items.filter((item) => {
    const title = (item.title || '').toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  const categories = ['all', 'beauty', 'fragrances', 'furniture', 'groceries'];

  return (
    <section className="space-y-6">
      <div className="wish-panel border-[#cbe7e2] bg-linear-to-r from-[#f8fffd] via-[#ffffff] to-[#f6fbff] shadow-[0_16px_36px_-24px_rgba(15,61,58,0.55)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex rounded-full bg-[#e8f7f3] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#0f6e62]">
              Trending catalog
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#123a36] sm:text-4xl">
              Noor picks this week
            </h2>
            <p className="mt-2 text-sm text-[#51706c] sm:text-base">
              Scroll, search, and filter quickly with a mobile-first shopping
              layout.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-140 lg:grid-cols-[1fr_auto]">
            <input
              type="text"
              className="wish-input h-11 border-[#c8ddd9] focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Link
              href="/products/addform"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-[#0f6e62] to-[#179b89] px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition hover:brightness-110"
            >
              Add New
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleFilter(category)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition ${
                activeCategory === category
                  ? 'border-[#0f6e62] bg-[#e6f7f4] text-[#0f6e62]'
                  : 'border-[#d7e7e4] bg-white text-[#4a6662] hover:border-[#0f6e62]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredItems.map((p, index) => {
            const imageSrc = p.thumbnail || DEFAULT_THUMBNAIL;
            const isInlineImage = imageSrc.startsWith('data:');

            return (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-[#d4e7e3] bg-white shadow-[0_12px_30px_-22px_rgba(15,61,58,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-22px_rgba(15,61,58,0.75)]"
              >
                <div className="relative h-52 overflow-hidden bg-linear-to-b from-[#f4fffc] to-[#eef6ff] sm:h-56">
                  <Image
                    src={imageSrc}
                    alt={p.title}
                    fill
                    priority={index < 4}
                    unoptimized={isInlineImage}
                    className="object-contain p-3 transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />

                  <div className="absolute right-3 top-3 rounded-full bg-[#123a36] px-3 py-1 text-sm font-extrabold text-[#f7d78c]">
                    ${p.price}
                  </div>
                </div>

                <div className="flex flex-col p-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#51837b]">
                    {p.category}
                  </span>
                  <h3 className="mt-2 truncate text-lg font-extrabold text-[#123a36]">
                    {p.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm text-[#5f7d79]">
                    {p.description ||
                      'Premium quality product with fast delivery and secure checkout.'}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/products/${p.id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#bfd9d3] px-0 text-sm font-bold uppercase tracking-[0.06em] text-[#0f6e62] transition hover:border-[#0f6e62] hover:bg-[#eff9f7]"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#efb6b6] text-[#b94747] transition hover:bg-[#fff3f3]"
                      title="Delete Product"
                    >
                      X
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="wish-panel text-center">
          <h3 className="text-xl font-bold text-[#51706c]">
            No products found...
          </h3>
        </div>
      )}
    </section>
  );
};

export default ProductsComponent;
