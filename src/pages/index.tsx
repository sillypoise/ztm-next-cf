import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Coffe Finder</title>
        <meta
          name="description"
          content="Find your new favourite coffee shop"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <article>
          <h2>Coffee Finder</h2>
        </article>
      </main>
    </>
  );
}
