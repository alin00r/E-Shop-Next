const Footer = () => {
  return (
    <footer className="mt-10 text-[#f3f4f6]">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#1d5b56] px-4 py-3 text-sm font-bold tracking-wide transition hover:bg-[#28726a]"
      >
        Back to top
      </button>

      <div className="bg-[#0f3d3a]">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <h3 className="text-base font-extrabold text-white">Noor Stor</h3>
            <p className="mt-3 text-sm text-[#d7ece8]">
              Practical shopping with clean design and curated products.
            </p>
            <p className="mt-2 text-sm text-[#d7ece8]">
              Open daily: 9AM - 11PM
            </p>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">Shop</h3>
            <p className="mt-3 text-sm text-[#d7ece8]">All Products</p>
            <p className="mt-2 text-sm text-[#d7ece8]">New Arrivals</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Top Rated</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Offers</p>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">Support</h3>
            <p className="mt-3 text-sm text-[#d7ece8]">Help Center</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Shipping Policy</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Returns</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Track Order</p>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">Contact</h3>
            <p className="mt-3 text-sm text-[#d7ece8]">Cairo, Egypt</p>
            <p className="mt-2 text-sm text-[#d7ece8]">+20 100 000 0000</p>
            <p className="mt-2 text-sm text-[#d7ece8]">hello@noorstor.com</p>
            <p className="mt-2 text-sm text-[#d7ece8]">Instagram / Facebook</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a5e59] bg-[#0b312e] py-5 text-center">
        <p className="text-lg font-black tracking-tight text-[#f7d78c]">
          Noor Stor
        </p>
        <p className="mt-2 text-xs text-[#d4e8e5]">
          © 2026 Noor Stor. All rights reserved.
        </p>
        <div className="mt-3 flex justify-center gap-3 text-xs text-[#d7ece8]">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
