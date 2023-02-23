import { config } from "config/config";

async function fetchInitialImages() {
    try {
        let searchParams = new URLSearchParams({
            page: "1",
            per_page: "10",
            query: "coffee shop",
            client_id: config.services.unsplash.access_key,
        });
        let results = await fetch(
            `https://api.unsplash.com/search/photos?${searchParams}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
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

export { fetchInitialImages };
