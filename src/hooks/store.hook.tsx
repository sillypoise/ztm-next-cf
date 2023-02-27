import { api_stores_schema } from "~/types/cofee_stores";

async function fetchStores({ ll, limit = 6 }: { ll: string; limit?: number }) {
    try {
        let searchParams = new URLSearchParams({
            latlong: ll,
            limit: limit.toString(),
        });
        let results = await fetch(`/api/stores?${searchParams}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        let json = await results.json();
        let stores = api_stores_schema.parse(json["stores"]);

        return stores;
    } catch (err) {
        console.error(err);
    }
}

async function createStore({
    store,
    signal,
}: {
    store: IStore;
    signal: AbortSignal;
}) {
    try {
        let res = await fetch(`/api/create_store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: store.id,
                name: store.name,
                address: store.address,
                votes: 0,
                img_url: store.image.url,
            }),
            signal: signal,
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export { fetchStores, createStore };
