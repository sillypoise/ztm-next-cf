import { config } from "config/config";

async function fetchInitialStores({
    ll,
    limit = 6,
}: {
    ll: string;
    limit?: number;
}) {
    try {
        let searchParams = new URLSearchParams({
            query: "coffee",
            ll: ll,
            limit: limit.toString(),
            // open_now: "true",
            // sort: "DISTANCE",
        });
        let results = await fetch(
            `https://api.foursquare.com/v3/places/search?${searchParams}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: config.services.foursquare.auth,
                },
            }
        );
        let json = await results.json();
        let data = json["results"];

        return data;
    } catch (err) {
        console.error(err);
    }
}

export { fetchInitialStores };
