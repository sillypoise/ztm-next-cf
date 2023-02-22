import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRef } from "react";
import { CoffeStoreCard } from "~/components/CoffeeCard";
import { coffeeStoresMockData } from "~/test/mocks/coffeeStoresData"

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
                    <p>Discover your new favourite coffee shop</p>
                    <button>View stores nearby</button>
                    <section className="auto-grid gap-2xs" data-layout="2/2" data-rows="masonry">
                        {coffeeStoresMockData.map((store, i) => (
                            <CoffeStoreCard
                                key={store.id}
                                title={store.name}
                                adress="1234 Coffee Street, Coffee City, Coffee Country"
                                imgURL="https://unsplash.com/photos/3b2tADGAWnU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NzcwNTg1NTU&force=true&w=1920"
                                imgAlt="generic coffee store"
                                href="/coffee-store/first-coffee"
                            />
                        ))}
                    </section>
                </article>
            </main>
        </>
    );
}
