import Head from "next/head";
import { CoffeStoreCard } from "~/components/CoffeeCard";
import { useGeolocation } from "~/hooks/useGeolocation";
import { coffeeStoresMockData } from "~/test/mocks/coffeeStoresData";

interface CoffeeStore {
    id: number;
    name: string;
    address: string;
    image: string;
}

interface IHomeProps {
    stores: Array<CoffeeStore>;
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
                        {stores.map((store, i) => (
                            <CoffeStoreCard
                                key={store.id}
                                title={store.name}
                                adress="1234 Coffee Street, Coffee City, Coffee Country"
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
    const stores = coffeeStoresMockData;
    return {
        props: {
            stores,
        },
    };
}
