import type { AppProps } from "next/app";
import Head from "next/head";

import UnauthenticatedLayout from "@/layout/unauthenticated-layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Scraper</title>
        <meta name="description" content="Scraper Web" />
        <link rel="stylesheet" href={"https://rsms.me/inter/inter.css"} />
      </Head>
      <UnauthenticatedLayout>
        <Component {...pageProps} />
      </UnauthenticatedLayout>
    </>
  );
}
