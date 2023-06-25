import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchBookList, listingSelector } from "./slice";
import List from "../../components/list/List";
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./style.css";

const ListingPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { books, totalBookCount, status } = useAppSelector(listingSelector);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams({ page: String(page) });
      setCurrentPage(page);
    },
    [setSearchParams]
  );

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    onPageChange(1);
  };

  useEffect(() => {
    dispatch(fetchBookList({ page: currentPage, searchText: searchText }));
  }, [currentPage, dispatch, searchText]);

  return (
    <div>
      <div className="search-field-wrapper">
        <TextField
          label="Search by text"
          variant="outlined"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </div>
      <List
        data={books}
        totalNumber={totalBookCount}
        onPageChange={onPageChange}
        isLoading={status === "loading"}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ListingPage;
