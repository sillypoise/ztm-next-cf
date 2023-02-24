import Head from "next/head";
import { useEffect, useState } from "react";
import { CoffeStoreCard } from "~/components/CoffeeCard";
import { fetchStores } from "~/hooks/fetchStores";
import { useGeolocation } from "~/hooks/useGeolocation";
import { useAppStore } from "~/lib/zustand";
import { IStores } from "~/types/cofee_stores";

interface IHomeProps {
    stores: IStores;
}

export default function Home({ stores }: IHomeProps) {
    let { handleTrackLocation, latlong, error } = useGeolocation();
    let nearbyStores = useAppStore((state) => state.nearbyStores);
    let setNearbyStores = useAppStore((state) => state.setNearbyStores);
    let [loading, setLoading] = useState<boolean>(false);

    function handleClick() {
        handleTrackLocation();
    }

    useEffect(() => {
        if (latlong && !nearbyStores.length) {
            setLoading(true);
            fetchStores({ ll: latlong, limit: 30 })
                .then((res) => {
                    res ? setNearbyStores(res) : null;
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }
    }, [latlong, setNearbyStores, nearbyStores]);

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
                    <button disabled={loading} onClick={() => handleClick()}>
                        {loading ? "..." : "Find stores near me!"}
                    </button>
                    {error ? (
                        <p>Something went wrong {error?.message}</p>
                    ) : null}
                    {nearbyStores.length ? (
                        <header>
                            <p className="text-2">
                                {nearbyStores.length} nearby coffee shops!
                            </p>
                        </header>
                    ) : null}
                    {nearbyStores.length ? (
                        <StoreGrid stores={nearbyStores} />
                    ) : null}
                    {nearbyStores.length ? <hr /> : null}
                    <StoreGrid stores={stores} />
                </article>
            </main>
        </>
    );
}

function StoreGrid({ stores }: { stores: IStores }) {
    return (
        <section
            className="auto-grid gap-xl"
            data-layout="2/2"
            data-rows="masonry"
        >
            {stores.map((store) => (
                <CoffeStoreCard
                    key={store.id}
                    title={store.name}
                    address={store.address}
                    image={store.image}
                    href={`/coffee-store/${store.id}`}
                />
            ))}
        </section>
    );
}

export async function getStaticProps(ctx) {
    let stores = await fetchStores({
        ll: "4.61616139773357,-74.07026744213343",
    });

    return {
        props: {
            stores,
        },
    };
}
