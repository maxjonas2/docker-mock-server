export const apiDomain = "http://localhost:3000/api";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
