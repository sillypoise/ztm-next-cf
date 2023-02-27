import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { get_store_by_id } from "~/models/stores.model";
import { IStore } from "~/types/cofee_stores";

interface IResponseData {
    store: IStore;
}

interface IResponseError {
    error: {
        stack: Error["stack"];
        message: Error["message"];
    };
}

export default async function store_by_id(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData | IResponseError>
) {
    try {
        let id = z
            .string({
                invalid_type_error: "id must be a string",
                required_error: "id is required",
            })
            .parse(req.query.id);

        if (req.method !== "GET") {
            throw new Error("Method not allowed");
        }

        let store = await get_store_by_id({ id });

        if (!store) {
            throw new Error("Store not found");
        }

        res.status(200).json({ store });
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

            if (error.message === "Store not found") {
                res.status(404).json({
                    error: { stack: error.stack, message: error.message },
                });
                return;
            }

            res.status(500).json({
                error: { stack: error.stack, message: error.message },
            });
            return;
        }
    }
}
