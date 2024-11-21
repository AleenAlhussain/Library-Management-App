import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";

const CheckoutPage = ({ cart, setCart }) => {
  const [step, setStep] = useState(1);
  const { state } = useLocation();
  const { borrowingPeriods } = state || {};
  const [submittedData, setSubmittedData] = useState(null);
  const [returnedBooks, setReturnedBooks] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      cardName: "",
      libraryCardNumber: "",
    },
  });

  const handleNext = (data) => {
    if (step === 1) {
      setSubmittedData(data);
      setStep(2);
    } else if (step === 2) {
      setSubmittedData((prev) => ({ ...prev, ...data }));
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    const storedBorrowings =
      JSON.parse(localStorage.getItem("borrowings")) || [];
    const newBorrowing = {
      date: new Date().toISOString().split("T")[0],
      books: cart.map((book) => ({
        Title: book.Title,
        Publisher: book.Publisher,
        description: book.description,
        returned: returnedBooks.includes(book.Title),
        returnDate: calculateReturnDate(borrowingPeriods[book.Title]),
      })),
    };

    localStorage.setItem(
      "borrowings",
      JSON.stringify([...storedBorrowings, newBorrowing])
    );
    setCart([]);
    alert("Success! Your borrowing has been confirmed.");
    window.location.href = "/";
  };

  const calculateReturnDate = (borrowingPeriod) => {
    const periodToDays = {
      "1 week": 7,
      "2 weeks": 14,
      "1 month": 31,
    };
    const days = periodToDays[borrowingPeriod] || 7;
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + days);
    return returnDate;
  };

  const isPastReturnDate = (returnDate) => {
    return new Date() > new Date(returnDate);
  };

  const handleMarkAsReturned = (bookTitle) => {
    setReturnedBooks((prev) => [...prev, bookTitle]);
  };

  return (
    <Container sx={{ mt: 16 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Step {step} of 3
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {step === 1 && (
        <form onSubmit={handleSubmit(handleNext)}>
          <Typography variant="h6" gutterBottom>
            Step 1: Personal Information
          </Typography>

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ""}
              />
            )}
            rules={{ required: "Full Name is required" }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#98C1D3",
              "&:hover": {
                backgroundColor: "#7AA9BB",
              },
              mt: 2,
            }}
          >
            Next
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(handleNext)}>
          <Typography variant="h6" gutterBottom>
            Step 2: Library Card Information
          </Typography>

          <Controller
            name="cardName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Library Card Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.cardName}
                helperText={errors.cardName ? errors.cardName.message : ""}
              />
            )}
            rules={{ required: "Library Card Name is required" }}
          />
          <Controller
            name="libraryCardNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Library Card Number"
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ type: 'number' }}
                error={!!errors.libraryCardNumber}
                helperText={
                  errors.libraryCardNumber ? errors.libraryCardNumber.message : ""
                }
              />
            )}
            rules={{ required: "Library Card Number is required" }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7AA9BB",
                "&:hover": {
                  backgroundColor: "#98C1D3",
                },
              }}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#98C1D3",
                "&:hover": {
                  backgroundColor: "#7AA9BB",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </form>
      )}

      {step === 3 && submittedData && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Step 3: Summary and Confirmation
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>
                Full Name: {submittedData.fullName}
              </Typography>
              <Typography>Email: {submittedData.email}</Typography>
              <Typography>
                Library Card Name: {submittedData.cardName}
              </Typography>
              <Typography>
                Library Card Number: {submittedData.libraryCardNumber}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Borrowed Books</Typography>
              <Grid container spacing={2}>
                {cart.map((book, index) => {
                  const returnDate = calculateReturnDate(borrowingPeriods[book.Title]);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">
                            <strong>{book.Title}</strong>
                          </Typography>
                          <Typography>Author: {book.Publisher}</Typography>
                          <Typography>Description: {book.Notes[0]}</Typography>
                          <Typography>
                            Due Date: {returnDate.toDateString()}
                          </Typography>
                          {isPastReturnDate(returnDate) && (
                            <Button
                              onClick={() => handleMarkAsReturned(book.Title)}
                              variant="contained"
                              color="secondary"
                              sx={{
                                backgroundColor: "#98C1D3",
                                "&:hover": {
                                  backgroundColor: "#7AA9BB",
                                },
                                ml: 2,
                              }}
                            >
                              Mark as Returned
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              <Typography variant="h6" mt={2}>
                Total Books: {cart.length}
              </Typography>
              <Button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to confirm the borrowing?"
                    )
                  ) {
                    handleConfirm();
                  }
                }}
                variant="contained"
                sx={{
                    backgroundColor: "#98C1D3",
                    "&:hover": {
                      backgroundColor: "#7AA9BB",
                    },
                    mt: 2,
                  }}
              >
                Confirm Borrowing
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default CheckoutPage;
