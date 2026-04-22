import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NewsToast from './components/NewsToast';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <div className="flex min-h-screen flex-col bg-[#e9edf3]">
          <NavBar />
          <main className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <Component {...pageProps} />
          </main>
          <Footer />
          <NewsToast />
        </div>
      )}
    </SessionProvider>
  );
}
