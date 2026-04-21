import { useState } from 'react';
import { useRouter } from 'next/router';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

const DEFAULT_THUMBNAIL =
  'https://thumbs.dreamstime.com/b/new-product-coming-soon-icon-shadow-simple-vector-logo-new-product-coming-soon-icon-shadow-416064962.jpg';

export default function EditProductPage({ product }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    thumbnail: product.thumbnail || DEFAULT_THUMBNAIL,
    stock: product.stock || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (!res.ok) {
        throw new Error('Update failed.');
      }

      await router.push(`/products/${product.id}`);
    } catch {
      setErrorMessage('Could not update product. Please check your values.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="wish-panel">
        <p className="wish-badge inline-flex">Update listing</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#2b1b3f] sm:text-4xl">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Product Title
            </label>
            <input
              type="text"
              className="wish-input"
              value={formData.title}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Price ($)
            </label>
            <input
              type="number"
              className="wish-input"
              value={formData.price}
              min="0"
              required
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Category
            </label>
            <input
              type="text"
              className="wish-input"
              value={formData.category}
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Stock
            </label>
            <input
              type="number"
              className="wish-input"
              min="0"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Description
            </label>
            <textarea
              className="wish-input min-h-28 p-4"
              rows="3"
              value={formData.description}
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Product Image URL
            </label>
            <input
              type="url"
              className="wish-input"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
          ) : null}

          <button type="submit" className="wish-btn w-full py-3 text-base">
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const found = await Product.findById(params.id).lean();

  if (!found) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        id: found._id.toString(),
        title: found.title,
        price: found.price,
        category: found.category,
        description: found.description,
        thumbnail: found.thumbnail,
        stock: found.stock,
      },
    },
  };
}
