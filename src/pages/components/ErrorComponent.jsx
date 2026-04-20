import { useRouter } from 'next/router';
import React from 'react';

const ErrorComponent = () => {
  const router = useRouter();

  const Back = () => {
    router.replace('/');
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div className="w-full max-w-lg rounded-3xl border border-noon-black/10 bg-white p-8 shadow-card">
        <h1 className="text-7xl font-extrabold text-noon-black">404</h1>

        <div className="mt-2 text-2xl font-bold text-red-600">
          Oops! Something Went Wrong
        </div>

        <p className="mb-5 mt-3 text-sm text-noon-slate">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>

        <button className="noon-btn" onClick={() => Back()}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
