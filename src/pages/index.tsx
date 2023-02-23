import Head from "next/head";
import { CoffeStoreCard } from "~/components/CoffeeCard";
import { fetchInitialStores } from "~/hooks/fetchInitialStores";
import { useGeolocation } from "~/hooks/useGeolocation";
import { IStores, stores_schema } from "~/types/cofee_stores";

interface IHomeProps {
    stores: IStores;
}

export default function Home({ stores }: IHomeProps) {
    let { handleTrackLocation, position, error, loading } = useGeolocation();

    function handleClick() {
        handleTrackLocation();
    }

    if (position) {
        let { latitude, longitude } = position?.coords;
        console.log({ latitude, longitude });
    }

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
                    <button disabled={loading} onClick={handleClick}>
                        {loading ? "..." : "Find my location"}
                    </button>
                    {error ? (
                        <p>Something went wrong {error?.message}</p>
                    ) : null}

                    {position ? (
                        <p>
                            {position?.coords.latitude},{" "}
                            {position?.coords.longitude}
                        </p>
                    ) : null}

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
                                imgURL={store.image}
                                imgAlt="generic coffee store"
                                href={`/coffee-store/${store.id}`}
                            />
                        ))}
                    </section>
                </article>
            </main>
        </>
    );
}

export async function getStaticProps(ctx) {
    let fsq_results = await fetchInitialStores({
        ll: "4.6959947138560585,-74.04567805371171",
    });
    let parsed_stores = stores_schema.parse(fsq_results);

    return {
        props: {
            stores: parsed_stores,
        },
    };
}
