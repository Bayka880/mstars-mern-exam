import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import BooksLits from "../components/BooksLits";
import Container from "@mui/material/Container";
import AddBook from "../components/AddBook";
export default function Home() {
  return (
    <Container maxWidth="lg">
      <BooksLits />
      <AddBook />
    </Container>
  );
}
