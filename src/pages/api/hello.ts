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

export default async function hello(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData | IResponseError>
) {
    res.status(200).json({ name: "hello" });
}
