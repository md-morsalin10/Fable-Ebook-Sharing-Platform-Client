import { serverFetch } from "../core/server";

export const getAnalytics = async () => {
    return await serverFetch("/api/admin/analytics");
}