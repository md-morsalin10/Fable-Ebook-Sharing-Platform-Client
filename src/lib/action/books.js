import { clientMutation } from "../core/clientApi";

export const createBook = async (bookData) => {
  return await clientMutation("/api/books", bookData);
}

