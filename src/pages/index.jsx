import Link from 'next/link';

const HomePage = () => {
  return (
    <section className="space-y-8 py-2 sm:py-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[2fr_1fr_1fr]">
        <article className="group relative min-h-80 overflow-hidden rounded-2xl border border-[#dcd8ca] bg-[#f5efe0] shadow-[0_18px_40px_-28px_rgba(41,30,6,0.6)]">
          <img
            src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1400&q=80"
            alt="Men fashion collection"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#f5efe0]/95 via-[#f5efe0]/70 to-[#f5efe0]/15" />

          <div className="relative z-10 max-w-90 p-5 sm:p-8">
            <p className="inline-flex rounded-full bg-[#1f3d37]/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#f8deb0]">
              Noor Stor Spring
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-[#1b1b1b] sm:text-4xl">
              Men's Spring Looks Sale
            </h1>
            <p className="mt-2 text-base font-semibold text-[#2e2e2e]">
              Up to 40% off all fresh spring fits
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex rounded-full bg-[#101820] px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#23363f]"
            >
              Shop now
            </Link>
          </div>
        </article>

        <article className="group relative min-h-80 overflow-hidden rounded-2xl border border-[#0a3f36]/25 shadow-[0_18px_40px_-28px_rgba(9,53,45,0.75)]">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            alt="Shopping offers"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0f3d3a]/10 via-[#0f3d3a]/45 to-[#0f3d3a]/90" />

          <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
            <h2 className="max-w-45 text-3xl font-black leading-tight">
              Noor Picks made for you
            </h2>
            <div className="self-start rounded-full border-4 border-[#7bf2b6] bg-[#1ad17d] px-4 py-3 text-center text-[#022418] shadow-[0_8px_18px_-8px_rgba(25,209,125,0.85)]">
              <p className="text-xs font-black uppercase tracking-wider">
                up to
              </p>
              <p className="text-5xl font-black leading-none">60%</p>
              <p className="text-xs font-black uppercase tracking-wider">off</p>
            </div>
          </div>
        </article>

        <article className="group relative min-h-80 overflow-hidden rounded-2xl border border-[#d7dee7] shadow-[0_18px_40px_-28px_rgba(20,39,70,0.45)]">
          <img
            src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=900&q=80"
            alt="Savings campaign"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0d1b2a]/20 via-[#0d1b2a]/55 to-[#0d1b2a]/85" />

          <div className="relative z-10 p-5 text-white">
            <h2 className="text-4xl font-black leading-[1.05]">
              Spend $50 get $5
            </h2>
            <p className="mt-2 text-lg font-bold text-[#dce8ff]">
              Tax day just got better
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomePage;
