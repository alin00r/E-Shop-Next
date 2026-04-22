import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';

const DEFAULT_THUMBNAIL =
  'https://thumbs.dreamstime.com/b/new-product-coming-soon-icon-shadow-simple-vector-logo-new-product-coming-soon-icon-shadow-416064962.jpg';

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'beauty',
    description: '',
    thumbnail: DEFAULT_THUMBNAIL,
  });
  const [imageError, setImageError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const processImageFile = (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Please choose a valid image file.');
      return;
    }

    const maxSizeBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setImageError('Image must be 2MB or smaller.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, thumbnail: String(reader.result) }));
      setImageError('');
    };
    reader.onerror = () => {
      setImageError('Could not read the selected image.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processImageFile(file);
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          thumbnail: formData.thumbnail || DEFAULT_THUMBNAIL,
        }),
      });

      if (res.ok) {
        alert('Product Added Successfully!');
        await router.push('/products');
      } else {
        setSubmitError('Could not save product. Please check your inputs.');
      }
    } catch {
      setSubmitError('Could not save product right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="wish-panel">
        <p className="wish-badge inline-flex">Inventory manager</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#2b1b3f] sm:text-4xl">
          Add New Product
        </h2>
        <p className="mt-2 text-sm text-[#7f6b97] sm:text-base">
          Create product listings with a mobile-friendly editor.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Product Title
            </label>
            <input
              type="text"
              className="wish-input"
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
            <select
              className="wish-input"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Description
            </label>
            <textarea
              className="wish-input min-h-28 p-4"
              rows="3"
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Product Image URL (optional)
            </label>
            <input
              type="url"
              className="wish-input"
              placeholder="https://example.com/product-image.jpg"
              value={
                formData.thumbnail.startsWith('data:') ? '' : formData.thumbnail
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  thumbnail: e.target.value || DEFAULT_THUMBNAIL,
                })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Upload Product Image
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mb-2 rounded-xl border-2 border-dashed p-4 text-center transition ${
                isDragging
                  ? 'border-[#5a2ea6] bg-[#f3ebff]'
                  : 'border-[#d8c8f2] bg-[#fbf8ff]'
              }`}
            >
              <p className="text-sm font-semibold text-[#4e3569]">
                Drag and drop image here
              </p>
              <p className="mt-1 text-xs text-[#7f6b97]">
                or use the file picker below
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="wish-input py-2"
              onChange={handleFileChange}
            />
            {imageError ? (
              <p className="mt-1 text-sm text-red-600">{imageError}</p>
            ) : null}
            <p className="mt-1 text-xs text-[#7f6b97]">
              JPG, PNG, WEBP. Max size: 2MB.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Image Preview
            </label>
            <div className="flex h-36 items-center justify-center rounded-xl border border-[#e8def7] bg-[#faf6ff] p-2">
              <img
                src={formData.thumbnail || DEFAULT_THUMBNAIL}
                alt="Product preview"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </div>
          <button type="submit" className="wish-btn w-full py-3 text-base">
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
          {submitError ? (
            <p className="text-sm font-semibold text-red-600">{submitError}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default AddProduct;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login?callbackUrl=/products/addform',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
