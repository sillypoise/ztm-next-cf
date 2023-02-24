import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getStoresByLocation } from "~/models/stores.model";
import { IStores } from "~/types/cofee_stores";

interface IResponseData {
    stores: IStores;
}

interface IQueryParmas {
    latlong: string;
    limit?: string;
}

interface IResponseError {
    error: {
        stack: Error["stack"];
        message: Error["message"];
    };
}

export default async function stores(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData | IResponseError>
) {
    try {
        let latlong = z
            .string({ required_error: "latlong is required" })
            .parse(req.query.latlong);
        let limit: string | undefined;

        if (req.query.limit) {
            limit = z.string().parse(req.query.limit);
        }

        if (!latlong) {
            throw new Error("latlong is required");
        }

        let stores = await getStoresByLocation({
            ll: latlong,
            limit: limit ? parseInt(limit) : 6,
        });
        if (!stores) {
            throw new Error("no stores found");
        }

        res.status(200).json({ stores });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            res.status(400).json({
                error: {
                    stack: error.stack,
                    message: error.issues[0].message,
                },
            });
        }
        if (error instanceof Error) {
            res.status(500).json({
                error: {
                    stack: error.stack,
                    message: error.message,
                },
            });
        }
        res.status(500).json({
            error: {
                stack: "end of the line",
                message: "end of the line",
            },
        });
    }
}
