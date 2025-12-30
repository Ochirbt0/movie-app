export const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
    },
    cache: "force-cache",
  });
  return await response.json();
};
