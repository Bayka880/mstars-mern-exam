import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function AddUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlerAddBook = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/book`, {
        book_name: e.target.bookName.value,
        isbn: e.target.isbn.value,
        author: e.target.author.value,
        publishedDate: e.target.date.value,
        book_price: e.target.price.value,
        publisher: e.target.publisher.value,
      })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          location.reload();
        }
      });
  };
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Button onClick={handleOpen}>Add book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handlerAddBook}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              name="bookName"
              style={{
                width: "300px",
              }}
            />
            <TextField
              id="filled-basic"
              label="ISBN"
              variant="filled"
              name="isbn"
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
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
            <TextField
              id="filled-basic"
              label="Published date"
              variant="filled"
              name="date"
              style={{
                width: "300px",
                marginTop: "15px",
              }}
            />
          </div>
          <button className="submit-addBook" type="submit">
            Submit
          </button>
        </Box>
      </Modal>
    </div>
  );
}
