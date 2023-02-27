import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";
import { createStore } from "~/hooks/store.hook";
import { useAppStore } from "~/lib/zustand";
import { getStoresByLocation } from "~/models/stores.model";
import { IStore, IStorePG } from "~/types/cofee_stores";

export default function CoffeeStore({
    store,
    notFound,
}: {
    store: IStore;
    notFound?: boolean;
}) {
    let router = useRouter();
    let storeId = router.query.id;
    let nearbyStores = useAppStore((state) => state.nearbyStores);
    let storeById = nearbyStores.find((store) => store.id === storeId);

    console.log(store);
    console.log(storeById);

    useEffect(() => {
        let controller = new AbortController();

        if (storeById) {
            createStore({ store: storeById, signal: controller.signal })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }

        createStore({ store, signal: controller.signal })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        return () => {
            controller.abort();
        };
    }, [storeById, store]);

    // If the page is not yet generated, this will be displayed
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

    // If the page is not found through getStaticProps we search for it in the nearbyStores client-side
    // we reassign the initial store prop to the store found in the nearbyStores
    if (notFound && storeById) {
        store = storeById;
    }

    return (
        <>
            <main>
                <Link href="/">Back to Home</Link>
                <article className="center stack mlb-l">
                    <h2>{store.name}</h2>
                    <p>{store.address}</p>
                    <Image
                        src={store.image.url}
                        alt={store.image.alt_description}
                        width={store.image.width}
                        height={store.image.height}
                        className="object-cover aspect-[1.78] w-auto h-auto"
                    />
                    <div className="cluster gap-3xs">
                        <span className="with-icon">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon text-4"
                            >
                                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                            </svg>
                        </span>
                        <span>{store.votes}</span>
                    </div>
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
    let querySegment = z.string().parse(ctx.params["id"]);

    let stores = await getStoresByLocation({
        ll: "4.61616139773357,-74.07026744213343",
        limit: 6,
    });

    let store = stores?.find((store) => store.id === querySegment);

    if (!store) {
        return {
            props: {
                notFound: true,
                store: {
                    id: parseInt(querySegment),
                    name: "Not Found",
                    address: "Not Found",
                    image: {
                        url: "https://unsplash.com/photos/3b2tADGAWnU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NzcwNTg1NTU&force=true&w=1920",
                        alt_description: "Not Found",
                        width: 1920,
                        height: 1280,
                    },
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
    let stores = await getStoresByLocation({
        ll: "4.61616139773357,-74.07026744213343",
        limit: 6,
    });

    return {
        paths: stores?.map((store) => ({
            params: { id: store.id.toString() },
        })),
        fallback: true,
    };
}
