import { config } from "config/config";
import {
    images_schema,
    IStore,
    IStorePG,
    stores_schema,
} from "~/types/cofee_stores";
import { db } from "~/lib/pg";

async function probe_pg() {
    try {
        let res = await db.query("SELECT NOW()");
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

async function create_new_store(
    store_data: IStorePG
): Promise<IStorePG | undefined> {
    try {
        let res = await db.one(
            `INSERT INTO public.store (
                store_id,
                name,
                address,
                votes,
                img_url
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            ) RETURNING *`,
            [
                store_data.id,
                store_data.name,
                store_data.address,
                store_data.votes,
                store_data.image,
            ]
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function get_store_by_id({
    id,
}: {
    id: string;
}): Promise<IStore | undefined> {
    try {
        let res = await db.one("SELECT * FROM store WHERE store_id = $1", [id]);
        return res;
    } catch (error) {}
}

async function favourite_store_by_id({ id }: { id: string }): Promise<void> {
    return;
}

// FSQ API
async function getStoresByLocation({
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

export { getStoresByLocation, probe_pg, get_store_by_id, create_new_store };
