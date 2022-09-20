import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { GrFormEdit } from "react-icons/gr";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import useSWR from "swr";
import moment from "moment";
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
function EditBook({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const booksApi = `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book/${id}`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error, mutate } = useSWR(booksApi, fetcher);

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book/?id=${id}`, {
        book_name: e.target.bookName.value,
        book_price: e.target.price.value,
        author: e.target.author.value,
        publishedDate: e.target.publishedDate.value,
        isbn: e.target.isbn.value,
        publisher: e.target.publisher.value,
      })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <GrFormEdit />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          noValidate
          autoComplete="off"
          onSubmit={handlerSubmit}
        >
          <div className="text-fields">
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              name="bookName"
              defaultValue={data && data.book_name}
              style={{
                width: "300px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Code"
              name="code"
              variant="filled"
              defaultValue={data && data._id}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Price"
              variant="filled"
              name="price"
              defaultValue={data && data.book_price}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Author"
              variant="filled"
              name="author"
              defaultValue={data && data.author}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="ISBN"
              name="isbn"
              variant="filled"
              defaultValue={data && data.isbn}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Publisher"
              variant="filled"
              name="publisher"
              defaultValue={data && data.publisher}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Published date"
              variant="filled"
              name="publishedDate"
              defaultValue={moment(data && data.publishedDate).format(
                "YYYY-MM-DD"
              )}
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <button className="submit-update" type="submit">
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditBook;
