import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/Layout';

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
