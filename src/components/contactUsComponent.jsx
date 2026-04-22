const ContactUsComponent = () => {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <article className="relative overflow-hidden rounded-3xl border border-[#bfe1dc] bg-linear-to-br from-[#0f3d3a] via-[#14645b] to-[#1a8e80] p-6 text-white shadow-[0_20px_45px_-26px_rgba(10,59,53,0.9)] sm:p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f7d78c]/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/12 blur-3xl" />

          <div className="relative">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#f7d78c]">
              We are here for you
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Contact Noor Stor
            </h1>
            <p className="mt-3 max-w-sm text-sm text-[#d8efea] sm:text-base">
              Need help with an order or product? Reach out and our team will
              get back to you as soon as possible.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-extrabold uppercase tracking-wide text-[#f7d78c]">
                  Email
                </p>
                <p className="mt-1 font-semibold">hello@noorstor.com</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-extrabold uppercase tracking-wide text-[#f7d78c]">
                  Phone
                </p>
                <p className="mt-1 font-semibold">+20 100 000 0000</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-extrabold uppercase tracking-wide text-[#f7d78c]">
                  Address
                </p>
                <p className="mt-1 font-semibold">Cairo, Egypt</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-[#d5e8e4] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,61,58,0.65)] sm:p-8">
          <h2 className="text-2xl font-black text-[#123a36] sm:text-3xl">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-[#5c7b76] sm:text-base">
            Fill in the form and we will contact you shortly.
          </p>

          <form className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                className="wish-input border-[#c8ddd9] focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
                placeholder="First name"
              />
              <input
                type="text"
                className="wish-input border-[#c8ddd9] focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
                placeholder="Last name"
              />
            </div>

            <input
              type="email"
              className="wish-input border-[#c8ddd9] focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
              placeholder="Email address"
            />

            <input
              type="tel"
              className="wish-input border-[#c8ddd9] focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
              placeholder="Phone number"
            />

            <textarea
              className="wish-input min-h-32 border-[#c8ddd9] p-4 focus:border-[#0f6e62] focus:shadow-[0_0_0_3px_rgba(15,110,98,0.18)]"
              placeholder="Write your message"
            />

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-[#0f6e62] to-[#179b89] py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_24px_-16px_rgba(15,110,98,0.85)] transition hover:brightness-110"
            >
              Send Message
            </button>
          </form>
        </article>
      </div>
    </section>
  );
};

export default ContactUsComponent;
