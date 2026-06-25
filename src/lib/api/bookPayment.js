import { serverFetch } from "../core/server";

export const getPaymentDataById = async (userId) => {
    return serverFetch(`/api/payment?userId=${userId}`);
}

export const getAllPayment = async () => {
    return serverFetch('/api/payment');
}

export const getPaymentDataByWriterId = async (writerId) => {
    return serverFetch(`/api/payment?writerId=${writerId}`);
}
