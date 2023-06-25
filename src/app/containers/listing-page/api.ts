export const fetchBooks = (page: number, searchText = "") => {
  return fetch("http://nyx.vima.ekt.gr:3000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page,
      filters: [{ type: "all", values: [searchText] }],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
