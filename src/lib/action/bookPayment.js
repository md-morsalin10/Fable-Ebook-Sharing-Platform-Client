import { serverMutation } from "../core/server";

export const createBookPayment = async (userData) => {
  return await serverMutation("/api/payment", userData);
}