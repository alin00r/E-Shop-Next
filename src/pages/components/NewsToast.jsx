import { useEffect, useState } from 'react';
import Link from 'next/link';

const getRandomIndex = (length, excludeIndex = -1) => {
  if (length <= 1) {
    return 0;
  }

  let next = Math.floor(Math.random() * length);
  while (next === excludeIndex) {
    next = Math.floor(Math.random() * length);
  }

  return next;
};

const NewsToast = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (!isMounted) {
          return;
        }

        const safeData = Array.isArray(data) ? data : [];
        setArticles(safeData);
        setCurrentIndex(getRandomIndex(safeData.length));
      } catch {
        if (isMounted) {
          setArticles([]);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (articles.length <= 1) {
      return;
    }

    const rotateToast = setInterval(() => {
      setCurrentIndex((prev) => getRandomIndex(articles.length, prev));
    }, 30000);

    return () => clearInterval(rotateToast);
  }, [articles]);

  if (!articles.length) {
    return null;
  }

  const current = articles[currentIndex];

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-88 rounded-xl border border-[#c9ddeb] bg-white/95 p-4 shadow-[0_20px_40px_-24px_rgba(18,58,82,0.85)] backdrop-blur-sm">
      <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#0f4f70]">
        News Toast
      </p>

      <h3 className="mt-1 line-clamp-2 text-sm font-black text-[#123a52] sm:text-base">
        {current?.title || 'Latest News'}
      </h3>

      <p className="mt-1 line-clamp-3 text-xs text-[#456678] sm:text-sm">
        {current?.body || 'Stay tuned for updates.'}
      </p>

      <Link
        href="/news"
        className="mt-3 inline-flex rounded-lg bg-[#123a52] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
      >
        Open News
      </Link>
    </div>
  );
};

export default NewsToast;
