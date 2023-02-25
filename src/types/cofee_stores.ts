import { z } from "zod";

let store_schema = z
    .object({
        fsq_id: z.string(),
        name: z.string(),
        location: z
            .object({
                address: z.string().default("No address found"),
            })
            .default({ address: undefined }),
    })
    .transform((val) => ({
        id: val.fsq_id,
        name: val.name,
        address: val.location?.address,
        image: {
            url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MTQzMzB8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY3NzE3NzI0MQ&ixlib=rb-4.0.3&q=80",
            height: 4480,
            width: 6720,
            description: "No description found",
            alt_description: "placeholder coffee shop image",
        },
    }));

let stores_schema = z.array(store_schema);

// create new schema based off transformed stores_schema

let api_stores_schema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        address: z.string().default("No address found"),
        image: z.object({
            url: z.string(),
            height: z.number(),
            width: z.number(),
            description: z.string().catch(() => "No description found"),
            alt_description: z.string().catch(() => "no alt_description found"),
        }),
    })
);

let image_schema = z.object({
    id: z.string(),
    width: z.number(),
    height: z.number(),
    description: z.string().catch(() => "No description found"),
    alt_description: z.string().catch(() => "no alt_description found"),
    urls: z.object({
        regular: z.string(),
        small: z.string(),
        thumb: z.string(),
    }),
    user: z.object({
        name: z.string(),
    }),
});

let images_schema = z.array(image_schema);

type IStore = z.infer<typeof store_schema>;
type IStores = z.infer<typeof stores_schema>;
type IImage = z.infer<typeof image_schema>;
type IImages = z.infer<typeof images_schema>;

export {
    stores_schema,
    api_stores_schema,
    store_schema,
    image_schema,
    images_schema,
};
export type { IStore, IStores, IImage, IImages };
