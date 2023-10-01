import type { AppProps } from "next/app";

import Layout from "../components/common/layout";

import "../styles/reset.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
