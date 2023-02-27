import { NextApiRequest, NextApiResponse } from "next";
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
    } catch (error) {}
}
