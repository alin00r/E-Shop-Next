import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import dbConnect from '../../lib/mongodb';
import News from '../../models/News';

const NewsPage = ({ newsData }) => {
  const { status } = useSession();
  const canAddNews = status === 'authenticated';
  const [items, setItems] = useState(newsData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems(newsData || []);
    }
  };

  useEffect(() => {
    setItems(newsData || []);
  }, [newsData]);

  useEffect(() => {
    fetchNews();

    const refreshInterval = setInterval(
      () => {
        fetchNews();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(refreshInterval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news article?')) {
      return;
    }

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete failed.');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      setStatusMessage('News article deleted.');
    } catch {
      setStatusMessage('Could not delete the news article.');
    }
  };

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(`${item.title}\n\n${item.body}`);
      setStatusMessage('News article copied.');
    } catch {
      setStatusMessage('Could not copy the news article.');
    }
  };

  const filteredItems = items.filter((item) => {
    const title = (item.title || '').toLowerCase();
    const body = (item.body || '').toLowerCase();
    const category = (item.category || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      title.includes(query) || body.includes(query) || category.includes(query)
    );
  });

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#d4e6ef] bg-linear-to-r from-[#ecf8ff] via-white to-[#f3fbf7] p-5 shadow-[0_18px_36px_-24px_rgba(11,61,95,0.5)]">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#0f4f70]">
          News Collection
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#123a52] sm:text-4xl">
          Manage News Posts
        </h1>
        <p className="mt-2 text-sm text-[#41657b]">
          Create, edit, and delete website news directly from MongoDB.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            className="wish-input h-11 flex-1 border-[#cfdfe8]"
            placeholder="Search news..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {canAddNews ? (
            <Link
              href="/news/addform"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#123a52] px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
            >
              Add News
            </Link>
          ) : (
            <span
              className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-xl bg-[#b8c9d3] px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white"
              title="Sign in to add news"
              aria-disabled="true"
            >
              Add News
            </span>
          )}
        </div>

        {statusMessage ? (
          <p className="mt-3 text-sm font-semibold text-[#0f4f70]">
            {statusMessage}
          </p>
        ) : null}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-[#d5e4ec] bg-white p-4 shadow-[0_12px_30px_-24px_rgba(18,58,82,0.65)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-[#eaf5fb] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#0f4f70]">
                  {item.category || 'general'}
                </span>

                <span className="text-xs font-semibold text-[#6d8797]">
                  {item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString()
                    : ''}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-extrabold text-[#123a52]">
                {item.title}
              </h2>
              <p className="mt-2 min-h-24 text-sm leading-6 text-[#4f6c7b]">
                {item.body}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#b9d8ca] px-4 py-2 text-sm font-bold uppercase tracking-[0.06em] text-[#0e6a4f] transition hover:bg-[#edf9f4]"
                >
                  Copy
                </button>

                <Link
                  href={`/news/edit/${item.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#bfd6e3] px-4 py-2 text-sm font-bold uppercase tracking-[0.06em] text-[#123a52] transition hover:bg-[#eff7fb]"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#efb6b6] px-4 py-2 text-sm font-bold uppercase tracking-[0.06em] text-[#b94747] transition hover:bg-[#fff3f3]"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="wish-panel flex flex-col items-center gap-4 text-center">
          <div>
            <h3 className="text-xl font-bold text-[#51706c]">
              No news articles found...
            </h3>
            <p className="mt-2 text-sm text-[#6a7f7c]">
              Add the first news post to populate this collection.
            </p>
          </div>

          {canAddNews ? (
            <Link
              href="/news/addform"
              className="inline-flex items-center justify-center rounded-xl bg-[#123a52] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
            >
              Add News Post
            </Link>
          ) : (
            <span
              className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-[#b8c9d3] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.08em] text-white"
              title="Sign in to add news"
              aria-disabled="true"
            >
              Add News Post
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default NewsPage;

export async function getStaticProps() {
  let newsData = [];

  try {
    await dbConnect();
    const articles = await News.find({}).sort({ createdAt: -1 }).lean();

    newsData = articles.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      body: item.body,
      category: item.category,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt ? item.createdAt.toISOString() : null,
      updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
    }));
  } catch {
    newsData = [];
  }

  return {
    props: {
      newsData,
    },
    revalidate: 300,
  };
}
