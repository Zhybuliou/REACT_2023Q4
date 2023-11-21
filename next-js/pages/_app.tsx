import { AppProps } from 'next/app';
import '../styles/globals.css'

interface CustomPageProps { 
 }
 
 function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
   return <Component {...pageProps} />
 }

 export default MyApp