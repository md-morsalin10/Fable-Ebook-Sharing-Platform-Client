import { serverMutation } from "../core/server";



export const createWriterSubscription = async (userData) => {
  return await serverMutation("/api/subscription", userData);
}
