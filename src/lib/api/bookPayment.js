import { serverFetch } from "../core/server";

export const getPaymentDataById = async (userId) => {
    return serverFetch(`/api/payment?userId=${userId}`);
}
