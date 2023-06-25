import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type State = {
  pageSize: number;
  page: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "bookAuthor", headerName: "Author(s)", width: 200 },
  { field: "bookTitle", headerName: "Title", width: 360 },
  {
    field: "bookPublicationYear",
    headerName: "Year",
    width: 60,
  },
  { field: "bookPublicationCity", headerName: "Publication City", width: 200 },
  {
    field: "bookPages",
    headerName: "Page",
    type: "number",
    width: 50,
  },
];

export default class DataTable extends React.Component<{
  data: any[];
  totalNumber: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
}> {
  state: State = {
    pageSize: 20,
    page: this.props.currentPage - 1,
  };

  render() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={this.props.data}
          columns={columns}
          paginationModel={{
            page: this.state.page,
            pageSize: this.state.pageSize,
          }}
          loading={this.props.isLoading}
          onPaginationModelChange={(data) => {
            this.props.onPageChange(data.page + 1);
            this.setState((state: State) => ({
              ...state,
              page: data.page,
              pageSize: data.pageSize,
            }));
          }}
          rowCount={this.props.data?.length * this.props.totalNumber}
          paginationMode="server"
          pageSizeOptions={[20]}
          checkboxSelection
        />
      </div>
    );
  }
}
