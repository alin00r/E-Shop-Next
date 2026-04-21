import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AddNewsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'general',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Could not save news article.');
      }

      await router.push('/news');
    } catch {
      setSubmitError('Could not save news article right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="wish-panel">
        <p className="wish-badge inline-flex">News manager</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#2b1b3f] sm:text-4xl">
          Add News Article
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Title
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
              Body
            </label>
            <textarea
              className="wish-input min-h-32 p-4"
              rows="5"
              required
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
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
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Image URL
            </label>
            <input
              type="url"
              className="wish-input"
              placeholder="https://example.com/news-image.jpg"
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          {submitError ? (
            <p className="text-sm font-semibold text-red-600">{submitError}</p>
          ) : null}

          <button type="submit" className="wish-btn w-full py-3 text-base">
            {isSubmitting ? 'Saving...' : 'Save News Article'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewsPage;
