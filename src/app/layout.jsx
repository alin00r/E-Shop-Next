import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Noor Stor',
  description: 'Practical shopping with clean design and curated products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="flex min-h-screen flex-col bg-[#e9edf3]">
          <NavBar />
          <main className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
