import React from "react";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import { Container, Grid, Box, Typography } from "@mui/material";
import { data } from "../data";
const HomePage = ({ cart, onBorrowBook, onReturnBook }) => {
  return (
    <Container>
      <Header />
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Featured Books</Typography>
      </Box>
      <Grid container spacing={3}>
        {data.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BookCard
              book={book}
              onBorrow={onBorrowBook}
              onReturn={onReturnBook}
              isBorrowed={!!cart.find((item) => item.Title === book.Title)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
