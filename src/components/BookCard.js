import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import img from "../images/book.webp";

const BookCard = ({ book, onBorrow, onReturn, isBorrowed }) => {
  const handleBorrowClick = () => {
    onBorrow(book);
  };

  const handleReturnClick = () => {
    onReturn(book);
  };

  if (!book) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 345, m: 2, backgroundColor: "#fdf5f5" }}>
      <CardMedia component="img" height="200" image={img} alt={book.Title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.Title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          by {book.Publisher}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {book.Notes[0]}
        </Typography>
      </CardContent>
      <CardActions>
        {!isBorrowed ? (
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: '#C3EBF5',
              '&:hover': {
                backgroundColor: '#7AA9BB',
              }
            }}
            onClick={handleBorrowClick}
          >
            Borrow Book
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: '#FFC107',
              '&:hover': {
                backgroundColor: '#FFA000',
              }
            }}
            onClick={handleReturnClick}
          >
            Return Book
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
