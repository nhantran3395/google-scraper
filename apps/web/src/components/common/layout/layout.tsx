import Head from "next/head";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Scrapper</title>
        <meta name="description" content="Scrapper Web" />
      </Head>
      <main className={"container"}>{children}</main>
    </>
  );
}
