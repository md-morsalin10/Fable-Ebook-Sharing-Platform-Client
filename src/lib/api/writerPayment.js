import { serverFetch } from "../core/server";

export const getWritersPayment = async () => {
    return await serverFetch("/api/writers/fee");
}