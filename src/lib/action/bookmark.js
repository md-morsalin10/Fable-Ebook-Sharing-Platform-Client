import { clientMutation } from "../core/clientApi";


export const createBookmark = async (data) => {
  return await clientMutation("/api/bookmarks/toggle", data);
}