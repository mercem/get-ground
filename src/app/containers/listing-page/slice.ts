import { fetchBooks } from "./api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type BookResponse = {
  id: number;
  book_author: string[];
  book_title: string;
  book_publication_year: number;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
};

type Book = {
  id: number;
  bookAuthor: string[];
  bookTitle: string;
  bookPublicationYear: number;
  bookPublicationCountry: string;
  bookPublicationCity: string;
  bookPages: number;
};

export interface ListingState {
  books: Book[];
  totalBookCount: number;
  status: "idle" | "loading" | "failed";
}

export const initialState: ListingState = {
  totalBookCount: -1,
  books: [],
  status: "idle",
};

export const fetchBookList = createAsyncThunk(
  "listing/fetchBooks",
  async (params: { page: number; searchText: string }) => {
    const response = await fetchBooks(params.page, params.searchText);
    return response;
  }
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBookList.fulfilled,
        (
          state,
          action: PayloadAction<{ books: BookResponse[]; count: number }>
        ) => {
          state.status = "idle";
          state.totalBookCount = action.payload?.count;
          state.books =
            action.payload?.books?.map((book: BookResponse) => ({
              id: book.id,
              bookAuthor: book.book_author,
              bookTitle: book.book_title,
              bookPublicationYear: book.book_publication_year,
              bookPublicationCountry: book.book_publication_country,
              bookPublicationCity: book.book_publication_city,
              bookPages: book.book_pages,
            })) || [];
        }
      )
      .addCase(fetchBookList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const listingSelector = (state: RootState) => state.listing;

export default listingSlice.reducer;
