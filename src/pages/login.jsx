import Link from 'next/link';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { signIn } from 'next-auth/react';
import { authOptions } from '../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const callbackUrl =
    typeof router.query.callbackUrl === 'string'
      ? router.query.callbackUrl
      : '/products';

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center py-8">
      <div className="w-full overflow-hidden rounded-4xl border border-[#cfe4e0] bg-white shadow-[0_24px_50px_-30px_rgba(15,61,58,0.75)]">
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-linear-to-br from-[#0f3d3a] via-[#15514d] to-[#1d6b63] p-8 text-white sm:p-10">
            <p className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f7d78c]">
              Secure access
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              Sign in to manage products.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#d9efe9] sm:text-base">
              Guests can browse a limited catalog. Sign in with Google or GitHub
              to unlock full product management, editing, and deletion.
            </p>
            <div className="mt-8 rounded-3xl border border-white/15 bg-white/8 p-4 text-sm text-[#d9efe9]">
              <p className="font-bold uppercase tracking-[0.08em] text-[#f7d78c]">
                Account access
              </p>
              <p className="mt-2 leading-6">
                Choose the provider you want to use. Your return destination
                will stay attached to the button you click.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 bg-[#f8fbfb] p-8 sm:p-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#123a36]">
                  What changes after sign in
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5f7d79]">
                  <li>
                    • View the full product catalog instead of the guest
                    preview.
                  </li>
                  <li>• Add, edit, and delete products from the UI.</li>
                  <li>• Clear purchased totals and manage product details.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-[#d7e7e4] bg-white p-4 shadow-[0_10px_24px_-18px_rgba(15,61,58,0.35)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#62807c]">
                  Sign-in options
                </p>

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl })}
                    className="flex w-full items-center gap-3 rounded-xl border border-[#d9dce1] bg-white px-4 py-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition hover:bg-[#f8f9fa]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f3f4] text-sm font-black text-[#1f1f1f]">
                      G
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-[#1f1f1f]">
                        Continue with Google
                      </span>
                      <span className="block text-xs text-[#5f6368]">
                        Use your Google account to sign in.
                      </span>
                    </span>
                    <span className="text-sm font-bold text-[#5f6368]">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => signIn('github', { callbackUrl })}
                    className="flex w-full items-center gap-3 rounded-xl border border-[#111827] bg-[#111827] px-4 py-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.24)] transition hover:bg-[#0b1220]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white">
                      GH
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-white">
                        Continue with GitHub
                      </span>
                      <span className="block text-xs text-[#cbd5e1]">
                        Use your GitHub account to sign in.
                      </span>
                    </span>
                    <span className="text-sm font-bold text-[#e2e8f0]">→</span>
                  </button>
                </div>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-2xl border border-[#bfd9d3] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#0f6e62] transition hover:border-[#0f6e62] hover:bg-[#eff9f7]"
              >
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/products',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
