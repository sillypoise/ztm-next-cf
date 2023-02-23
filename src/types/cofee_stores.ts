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

type IStore = z.infer<typeof store_schema>;
type IStores = z.infer<typeof stores_schema>;

export { stores_schema, store_schema };
export type { IStore, IStores };
