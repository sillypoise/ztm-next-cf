import { config } from "config/config";
import { stores_schema } from "~/types/cofee_stores";

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

        return stores;
    } catch (err) {
        console.error(err);
    }
}

export { fetchStores };
