import { serverFetch } from "../core/server";

export const getBookmarksByUserId = async (userId) => {
    return serverFetch(`/api/bookmarks?userId=${userId}`);
}
