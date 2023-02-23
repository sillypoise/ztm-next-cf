import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";
import { fetchInitialStores } from "~/hooks/fetchInitialStores";
import { coffeeStoresMockData } from "~/test/mocks/coffeeStoresData";
import { stores_schema } from "~/types/cofee_stores";

interface ICoffeeStoreProps {
    id: number;
    name: string;
    address: string;
    image: string;
}

export default function CoffeeStore({ store }: { store: ICoffeeStoreProps }) {
    let router = useRouter();
    let querySegment = router.query.id;

    if (router.isFallback) {
        return (
            <>
                <main>
                    <Link href="/">Back to Home</Link>
                    <article className="center stack mlb-l">
                        <h2>Loading...</h2>
                    </article>
                </main>
            </>
        );
    }

    return (
        <>
            <main>
                <Link href="/">Back to Home</Link>
                <article className="center stack mlb-l">
                    <h2>{store.name}</h2>
                    <p>{store.address}</p>
                    <Image
                        src={store.image}
                        alt="generic coffee store"
                        width={600}
                        height={850}
                    />
                </article>
            </main>
        </>
    );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
    if (!ctx.params) {
        return {
            props: {
                error: "No params found",
            },
        };
    }
    let querySegment = ctx.params["id"];
    let parsedQuerySegment = z.string().parse(querySegment);

    let fsq_results = await fetchInitialStores({
        ll: "4.6959947138560585,-74.04567805371171",
    });
    let parsed_stores = stores_schema.parse(fsq_results);

    let store = parsed_stores.find((store) => store.id === parsedQuerySegment);
    if (!store) {
        return {
            props: {
                store: {
                    id: parseInt(parsedQuerySegment),
                    name: "Not Found",
                    address: "Not Found",
                    image: "https://unsplash.com/photos/3b2tADGAWnU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NzcwNTg1NTU&force=true&w=1920",
                },
            },
        };
    }
    return {
        props: {
            store,
        },
    };
}

export async function getStaticPaths(ctx: GetStaticPathsContext) {
    let fsq_results = await fetchInitialStores({
        ll: "4.6959947138560585,-74.04567805371171",
    });
    let parsed_stores = stores_schema.parse(fsq_results);
    return {
        paths: parsed_stores.map((store) => ({
            params: { id: store.id.toString() },
        })),
        fallback: true,
    };
}
