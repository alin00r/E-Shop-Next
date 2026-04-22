import Link from 'next/link';

const NavBar = () => {
  const quickLinks = ['Fresh Picks', 'New Arrivals', 'Best Sellers', 'Support'];

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contactus', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-[0_6px_20px_-14px_rgba(13,51,45,0.65)]">
      <div className="bg-[#0f3d3a] text-white">
        <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mr-1 shrink-0 rounded-md px-1 py-1 hover:outline-1 hover:outline-white/80"
          >
            <span className="text-2xl font-black tracking-tight text-[#f7d78c]">
              Noor Stor
            </span>
          </Link>

          <div className="hidden shrink-0 text-xs text-[#d8efe9] lg:block">
            <p className="leading-none">Shopping made simple</p>
            <p className="mt-1 text-sm font-bold text-white">
              Fast local delivery
            </p>
          </div>

          <div className="order-3 flex w-full overflow-hidden rounded-full border border-white/20 bg-white lg:order-0 lg:flex-1">
            <input
              type="text"
              placeholder="Search in Noor Stor"
              className="h-10 flex-1 px-4 text-sm text-[#111827] outline-none"
            />
            <button
              type="button"
              className="h-10 px-4 bg-[#ffb84c] text-[#1f2937] transition hover:bg-[#f3a847]"
              aria-label="Search"
            >
              Search
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <Link
              href="/products"
              className="rounded-full bg-white/12 px-3 py-2 font-bold leading-tight transition hover:bg-white/20"
            >
              Browse
            </Link>
            <Link
              href="/contactus"
              className="rounded-full border border-white/35 px-3 py-2 font-bold leading-tight transition hover:bg-white/12"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>

      <div className="bg-[#15514d]">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 text-sm text-[#e5f5f1] sm:px-6 lg:px-8">
          {quickLinks.map((label) => (
            <span
              key={label}
              className="shrink-0 rounded-full bg-white/12 px-3 py-1 font-semibold"
            >
              {label}
            </span>
          ))}

          <div className="ml-auto hidden items-center gap-2 md:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#f7d78c]/80 bg-linear-to-r from-[#fff8df] via-white to-[#ffeab5] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#0f3d3a] shadow-[0_10px_20px_-14px_rgba(247,215,140,0.95)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-14px_rgba(247,215,140,1)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
