import { localFetch, serverFetch } from "../core/server";

export const getBooksByWriterId = async ({writerId}) => {
  return await serverFetch(`/api/books?writerId=${writerId}`);
};

// not verify token 
export const getBooks = async () => {
  return await localFetch("/api/books");
};

export const getBookById = async (id, currentUserEmail) => {
    return serverFetch(`/api/books/${id}?userEmail=${currentUserEmail}`);
}

export const getFeaturedBooks = async () => {
    return await localFetch("/api/features/books");
}

