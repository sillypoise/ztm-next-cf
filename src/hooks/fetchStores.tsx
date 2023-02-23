import { config } from "config/config";
import { images_schema, stores_schema } from "~/types/cofee_stores";

async function fetchStores({ ll, limit = 6 }: { ll: string; limit?: number }) {
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
                    Authorization: config.services.foursquare.client_auth,
                },
            }
        );
        let json = await results.json();
        let data = json["results"];
        let parsedStores = stores_schema.parse(data);
        let images = await fetchImages({});
        let parsed_images = images_schema.parse(images);
        let random_images = parsed_images.sort(() => Math.random() - 0.5);
        let random_images_sliced = random_images.slice(0, limit);
        //
        let stores = parsedStores.map((store, i) => {
            return {
                ...store,
                image: {
                    url: random_images_sliced[i].urls.regular,
                    width: random_images_sliced[i].width,
                    height: random_images_sliced[i].height,
                    description: random_images_sliced[i].description,
                    alt_description: random_images_sliced[i].alt_description,
                },
            };
        });

        return stores;
    } catch (err) {
        console.error(err);
    }
}

async function fetchImages({ limit = 6 }: { limit?: number }) {
    try {
        let searchParams = new URLSearchParams({
            page: "1",
            per_page: "50",
            query: "coffee shop",
            client_id: config.services.unsplash.client_auth,
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

export { fetchStores };
