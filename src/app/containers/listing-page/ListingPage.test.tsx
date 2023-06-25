import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import ListingPage from "./ListingPage";
import * as api from "./api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListingPage />,
  },
]);

test("renders ListingPage", async () => {
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

  render(
    /**
     *   This provider should be separate component and all consumers should be handled there
     *   for the sake of simplicity, I put here.
     * */
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText("test_author")).toBeInTheDocument();
  });
});
