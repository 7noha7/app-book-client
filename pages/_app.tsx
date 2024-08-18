
import Layout from '@/components/Layout';
import '../styles/globals.css';
import type {AppProps } from "next/app";
import { AuthProvider } from '@/src/context/userAuth';

export default function MyApp({ Component, pageProps}: AppProps){
  return (
    <AuthProvider>
    <div>
      <Layout>
      <Component {...pageProps} />
      </Layout> 
    </div>
    </AuthProvider>
  )
}

