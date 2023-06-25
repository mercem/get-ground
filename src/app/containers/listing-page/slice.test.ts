import reducer, { fetchBookList, initialState } from "./slice";
import * as api from "./api";
import { store } from "../../store";

describe("counter reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle increment", () => {
    jest.spyOn(api, "fetchBooks").mockResolvedValue({
      books: [
        {
          id: 1,
          book_author: ["test_author"],
          book_title: "test_title",
          book_publication_year: 2023,
          book_publication_country: "test_country",
          book_publication_city: "test_city",
          book_pages: 1234,
        },
      ],
      count: 1000,
    });

    return store
      .dispatch(fetchBookList({ page: 1, searchText: "" }))
      .then(() => {
        expect(store.getState().listing?.books?.length).toBe(1);
        expect(store.getState().listing?.books?.[0].bookAuthor).toStrictEqual([
          "test_author",
        ]);
      });
  });
});
