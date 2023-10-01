import type { AppProps } from "next/app";
import Head from "next/head";

import PageLayout from "../components/common/layout";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Scrapper</title>
        <meta name="description" content="Scrapper Web" />
        <link rel="stylesheet" href={"https://rsms.me/inter/inter.css"} />
      </Head>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </>
  );
}
