import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";
import { fetchStores } from "~/hooks/fetchStores";
import { IStore } from "~/types/cofee_stores";

export default function CoffeeStore({ store }: { store: IStore }) {
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
                        src={store.image.url}
                        alt={store.image.alt_description}
                        width={store.image.width}
                        height={store.image.height}
                        className="object-cover aspect-[1.78] w-auto h-auto"
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

    let stores = await fetchStores({
        ll: "4.61616139773357,-74.07026744213343",
    });

    let store = stores?.find((store) => store.id === parsedQuerySegment);

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
    let stores = await fetchStores({
        ll: "4.61616139773357,-74.07026744213343",
    });

    return {
        paths: stores?.map((store) => ({
            params: { id: store.id.toString() },
        })),
        fallback: true,
    };
}
