import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { create_new_store, get_store_by_id } from "~/models/stores.model";
import { api_request_store_schema, IStorePG } from "~/types/cofee_stores";

interface IResponseData {
    store: IStorePG;
}

interface IResponseError {
    error: {
        stack: Error["stack"];
        message: Error["message"];
    };
}

export default async function create_store(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData | IResponseError>
) {
    try {
        let id = z
            .string({ invalid_type_error: "id must be a string" })
            .parse(req.body.id);
        let store_data = api_request_store_schema.parse(req.body);

        if (req.method !== "POST") {
            throw new Error("Method not allowed");
        }
        let store_exists = await get_store_by_id({ id });

        if (store_exists) {
            throw new Error("Store already exists");
        }

        let new_store = await create_new_store(store_data);
        if (!new_store) {
            throw new Error("Failed to create store");
        }

        res.status(201).json({ store: new_store });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            res.status(400).json({
                error: { stack: error.stack, message: error.message },
            });
            return;
        }
        if (error instanceof Error) {
            if (error.message === "Method not allowed") {
                res.status(405).json({
                    error: { stack: error.stack, message: error.message },
                });
                return;
            }

            if (error.message === "Store already exists") {
                res.status(409).json({
                    error: { stack: error.stack, message: error.message },
                });
                return;
            }

            res.status(500).json({
                error: { stack: error.stack, message: error.message },
            });
        }
    }
}
