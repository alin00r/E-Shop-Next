import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_THUMBNAIL =
  'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';

const ProductsComponent = ({ products, isAuthenticated = false }) => {
  const [items, setItems] = useState(products || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [totalAmount, setTotalAmount] = useState(0);
  const [buyFeedback, setBuyFeedback] = useState('');
  const canManageProducts = Boolean(isAuthenticated);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems(products || []);
    }
  };

  useEffect(() => {
    setItems(products || []);
  }, [products]);

  useEffect(() => {
    fetchProducts();

    const refreshInterval = setInterval(
      () => {
        fetchProducts();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch('/api/purchases/total');
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setTotalAmount(Number(data.totalAmount || 0));
      } catch {
        setTotalAmount(0);
      }
    };

    fetchTotals();
  }, []);

  const handleDelete = async (id) => {
    if (!canManageProducts) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
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

  const handleBuy = async (id) => {
    setBuyFeedback('');

    try {
      const res = await fetch(`/api/products/${id}/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error('Could not buy product.');
      }

      const data = await res.json();
      setTotalAmount(Number(data.totalAmount || 0));
      setBuyFeedback(
        `Purchase added. Total revenue: $${Number(data.totalAmount || 0).toFixed(2)}`,
      );
    } catch {
      setBuyFeedback('Purchase failed. Please try again.');
    }
  };

  const handleClearPurchased = async () => {
    if (!canManageProducts) {
      return;
    }

    if (!window.confirm('Empty all purchased records?')) {
      return;
    }

    try {
      const res = await fetch('/api/purchases/total', {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Could not clear purchased records.');
      }

      setTotalAmount(0);
      setBuyFeedback('Purchased records emptied.');
    } catch {
      setBuyFeedback('Could not empty purchased records.');
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

  const displayedItems = canManageProducts
    ? filteredItems
    : filteredItems.slice(0, 4);

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
              className={`inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-extrabold uppercase tracking-[0.08em] shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition ${
                canManageProducts
                  ? 'bg-linear-to-r from-[#0f6e62] to-[#179b89] text-white hover:brightness-110'
                  : 'pointer-events-none cursor-not-allowed bg-[#d9e6e4] text-[#7b8f8c] shadow-none'
              }`}
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

        <div className="mt-4 rounded-xl border border-[#d7e7e4] bg-white px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#62807c]">
            Total Purchased Amount
          </p>
          <p className="mt-1 text-2xl font-black text-[#123a36]">
            ${totalAmount.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={handleClearPurchased}
            className="mt-3 inline-flex items-center justify-center rounded-lg border border-[#efb6b6] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#b94747] transition hover:bg-[#fff3f3]"
          >
            Empty Purchased
          </button>

          {buyFeedback ? (
            <p className="mt-2 text-sm font-semibold text-[#0f6e62]">
              {buyFeedback}
            </p>
          ) : null}
        </div>
      </div>

      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {displayedItems.map((p, index) => {
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
                      type="button"
                      onClick={() => handleBuy(p.id)}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-[#123a36] to-[#0f6e62] px-0 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:brightness-110"
                    >
                      Buy
                    </button>

                    {canManageProducts ? (
                      <Link
                        href={`/products/edit/${p.id}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#bfd9d3] text-[#123a36] transition hover:bg-[#eff9f7]"
                        title="Edit Product"
                      >
                        E
                      </Link>
                    ) : (
                      <span
                        className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-[#d9e6e4] text-[#8ba09c]"
                        title="Sign in to edit product"
                        aria-disabled="true"
                      >
                        E
                      </span>
                    )}

                    <button
                      onClick={() => handleDelete(p.id)}
                      type="button"
                      disabled={!canManageProducts}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#efb6b6] text-[#b94747] transition hover:bg-[#fff3f3] disabled:cursor-not-allowed disabled:border-[#e2e8e7] disabled:text-[#8ba09c] disabled:hover:bg-transparent"
                      title={
                        canManageProducts
                          ? 'Delete Product'
                          : 'Sign in to delete product'
                      }
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
        <div className="wish-panel flex flex-col items-center gap-4 text-center">
          <div>
            <h3 className="text-xl font-bold text-[#51706c]">
              No products found...
            </h3>
            <p className="mt-2 text-sm text-[#6a7f7c]">
              Try a different filter or add the first item to this collection.
            </p>
          </div>

          <Link
            href="/products/addform"
            className={`mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold uppercase tracking-[0.08em] shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition ${
              canManageProducts
                ? 'bg-linear-to-r from-[#0f6e62] to-[#179b89] text-white hover:brightness-110'
                : 'pointer-events-none cursor-not-allowed bg-[#d9e6e4] text-[#7b8f8c] shadow-none'
            }`}
          >
            Add New Product
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductsComponent;
