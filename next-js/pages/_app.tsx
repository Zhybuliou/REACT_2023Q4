import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <ErrorBoundary>
      <Layout>

        <Component {...pageProps} />
      </Layout>
      </ErrorBoundary>
  );
}

export default MyApp;
