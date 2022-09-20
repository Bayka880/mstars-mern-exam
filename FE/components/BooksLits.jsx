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
import moment from "moment";
import EditBook from "./EditBook";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
function BooksLits() {
  const [open, setOpen] = React.useState(false);
  const [openEditBook, setOpenEdit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const booksApi = `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error, mutate } = useSWR(booksApi, fetcher);
  const handDelete = (e) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book/${e}`)
      .then((res) => {
        if (res.status === 200) {
          mutate();
        }
      })
      .catch((err) => console.log(err));
  };
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
                <TableCell align="right">
                  {moment(row.publishedDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="right">
                  <EditBook id={row._id} />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleOpen}>
                    <RiDeleteBinLine />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div>
                        <button onClick={handDelete}>
                          <RiDeleteBinLine />
                        </button>
                        <button onClick={() => handleClose()}>Cancel</button>
                      </div>
                    </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksLits;
