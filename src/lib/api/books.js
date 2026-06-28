import { serverFetch } from "../core/server";

export const getBooksByWriterId = async ({writerId}) => {
  // const response = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  // const data = await response.json();
  // return data;
  return await serverFetch(`/api/books?writerId=${writerId}`);
};

export const getBooks = async () => {
  return await serverFetch("/api/books");
};

export const getBookById = async (id, currentUserEmail) => {
    return serverFetch(`/api/books/${id}?userEmail=${currentUserEmail}`);
}

export const getFeaturedBooks = async () => {
    return await serverFetch("/api/features/books");
}

