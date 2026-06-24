import { serverMutation } from "../core/server";

export const createBookmark = async (data) => {
  return await serverMutation("/api/bookmarks/toggle", data);
}