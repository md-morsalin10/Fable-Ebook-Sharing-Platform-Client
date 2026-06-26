import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getBooksByWriterId = async ({writerId}) => {
  const response = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  const data = await response.json();
  return data;
};

export const getBooks = async () => {
  return await serverFetch("/api/books");
};

export const getBookById = async (id, currentUserEmail) => {
    return serverFetch(`/api/books/${id}?userEmail=${currentUserEmail}`);
}

export const getFeaturedBooks = async () => {
    return serverFetch("/api/features/books");
}

