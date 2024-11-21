import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";

const CartPage = ({ cart, setCart }) => {
  const [borrowingPeriod, setBorrowingPeriod] = useState("1 week");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const calculateReturnDate = (period) => {
    const today = new Date();
    const returnDate = new Date(today);

    switch (period) {
      case "1 week":
        returnDate.setDate(today.getDate() + 7);
        break;
      case "2 weeks":
        returnDate.setDate(today.getDate() + 14);
        break;
      case "1 month":
        returnDate.setMonth(today.getMonth() + 1);
        break;
      default:
        returnDate = today;
    }

    return returnDate.toDateString();
  };

  const handleProceedToCheckout = () => {
    if (agreeToTerms) {
      const borrowingPeriods = cart.reduce((acc, book) => {
        acc[book.Title] = borrowingPeriod;
        return acc;
      }, {});

      const returnDates = cart.reduce((acc, book) => {
        acc[book.Title] = calculateReturnDate(borrowingPeriod);
        return acc;
      }, {});

      navigate("/checkout", {
        state: { cart, borrowingPeriods, returnDates },
      });
    } else {
      alert("Please agree to the terms and conditions before proceeding.");
    }
  };

  return (
    <Container sx={{ mt: 16 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{book.Title}</Typography>
                    <Typography variant="body2">by {book.Publisher}</Typography>
                    <Typography variant="body2">{book.Notes[0]}</Typography>
                    <Typography variant="body1" mt={2}>
                      Return Date: {calculateReturnDate(borrowingPeriod)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <TextField
            select
            label="Select Borrowing Period for All Books"
            value={borrowingPeriod}
            onChange={(e) => setBorrowingPeriod(e.target.value)}
            sx={{ width: 200, mb: 4 }}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="1 week">1 week</MenuItem>
            <MenuItem value="2 weeks">2 weeks</MenuItem>
            <MenuItem value="1 month">1 month</MenuItem>
          </TextField>
          <Box mt={2}>
            <Typography variant="h6">Total Books: {cart.length}</Typography>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
            }
            label="I agree to the terms and conditions"
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleProceedToCheckout}
            variant="contained"
            disabled={!agreeToTerms}
            sx={{
              mt: 2,
              backgroundColor: "#C3EBF5",
              "&:hover": {
                backgroundColor: "#7AA9BB",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
