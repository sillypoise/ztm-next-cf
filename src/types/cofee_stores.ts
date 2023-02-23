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
        image: "https://unsplash.com/photos/3b2tADGAWnU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NzcwNTg1NTU&force=true&w=1920",
    }));

let stores_schema = z.array(store_schema);

let image_schema = z.object({
    id: z.string(),
    width: z.number(),
    height: z.number(),
    description: z.string().catch(() => "No description found"),
    alt_description: z.string(),
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

export { stores_schema, store_schema, image_schema, images_schema };
export type { IStore, IStores, IImage, IImages };
