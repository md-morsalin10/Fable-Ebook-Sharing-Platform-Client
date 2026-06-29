import { clientFetch } from "../core/clientApi";

export const getAnalytics = async () => {
    return await clientFetch("/api/admin/analytics");
}