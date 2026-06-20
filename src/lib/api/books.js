const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getBooksByWriterId = async ({writerId}) => {
  const response = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  const data = await response.json();
  return data;
};