import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import useSWR from "swr";
import DatePicker from "react-datepicker";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
function BooksLits() {
  const booksApi = `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error, mutate } = useSWR(booksApi, fetcher);
  const handDelete = (e) => {};
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Authors</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Published on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i - 1 + 2}
                </TableCell>
                <TableCell align="right">{row.book_name}</TableCell>
                <TableCell align="right">{row._id.slice(0, 8)}</TableCell>
                <TableCell align="right">{row.book_price}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.isbn}</TableCell>
                <TableCell align="right">{row.publisher}</TableCell>
                <TableCell align="right">{row.publishedDate}</TableCell>
                <TableCell align="right">
                  <GrFormEdit />
                </TableCell>
                <TableCell align="right">
                  <RiDeleteBinLine onClick={() => handDelete(row._id)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksLits;
