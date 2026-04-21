import { useState } from 'react';
import { useRouter } from 'next/router';
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';

export default function EditNewsPage({ article }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: article.title,
    body: article.body,
    category: article.category || 'general',
    imageUrl: article.imageUrl || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/news/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Update failed.');
      }

      await router.push('/news');
    } catch {
      setErrorMessage('Could not update the news article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="wish-panel">
        <p className="wish-badge inline-flex">Update news</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#2b1b3f] sm:text-4xl">
          Edit News Article
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-[#4e3569]">
              Title
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
              Body
            </label>
            <textarea
              className="wish-input min-h-32 p-4"
              rows="5"
              value={formData.body}
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
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
          ) : null}

          <button type="submit" className="wish-btn w-full py-3 text-base">
            {isSubmitting ? 'Updating...' : 'Update News Article'}
          </button>
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const found = await News.findById(params.id).lean();

  if (!found) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: {
        id: found._id.toString(),
        title: found.title,
        body: found.body,
        category: found.category,
        imageUrl: found.imageUrl,
      },
    },
  };
}
