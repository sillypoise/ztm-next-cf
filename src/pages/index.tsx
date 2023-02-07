import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const dialogRef = useRef(null)
    return (
        <>
            <Head>
                <title>Coffee Finder</title>
                <meta
                    name="description"
                    content="Find your new favourite coffee shop"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <article className="center stack mlb-l">
                    <h2>Coffee Finder</h2>
                    <p>find your new favourite coffee shop</p>
                </article>
            </main>
        </>
    );
}
