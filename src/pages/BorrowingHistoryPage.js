import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

const BorrowingHistoryPage = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [filteredBorrowings, setFilteredBorrowings] = useState([]);
  const [selectedBorrowing, setSelectedBorrowing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const storedBorrowings =
      JSON.parse(localStorage.getItem("borrowings")) || [];
    setBorrowings(storedBorrowings);
    setFilteredBorrowings(storedBorrowings);
  }, []);

  useEffect(() => {
    filterBorrowingsByDate();
  }, [startDate, endDate]);

  const filterBorrowingsByDate = () => {
    let filtered = borrowings;

    if (startDate) {
      filtered = filtered.filter(
        (borrowing) => new Date(borrowing.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (borrowing) => new Date(borrowing.date) <= new Date(endDate)
      );
    }

    setFilteredBorrowings(filtered);
  };

  const handleViewDetails = (borrowing) => {
    setSelectedBorrowing(borrowing);
  };

  const handleCloseDetails = () => {
    setSelectedBorrowing(null);
  };

  const handleMarkAsReturned = (index) => {
    const updatedBorrowings = [...borrowings];
    updatedBorrowings[index].books.forEach((book) => (book.returned = true));
    localStorage.setItem("borrowings", JSON.stringify(updatedBorrowings));
    setBorrowings(updatedBorrowings);
    setFilteredBorrowings(updatedBorrowings);
  };

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <Container sx={{ mt: 15 }}>
      <Typography variant="h4" gutterBottom>
        Borrowing History
      </Typography>

      {/* Date Filtering Inputs */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "200px" }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "200px" }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Books</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBorrowings.length > 0 ? (
              filteredBorrowings.map((borrowing, index) => {
                // Calculate the end of the borrowing period (e.g., 1 month after the borrowing date)
                const borrowingDate = new Date(borrowing.date);
                const returnDeadline = new Date(borrowingDate);
                returnDeadline.setMonth(borrowingDate.getMonth() + 1);
                const showMarkAsReturnedButton = 
                  currentDate >= returnDeadline.toISOString().split("T")[0];

                return (
                  <TableRow key={index}>
                    <TableCell>{borrowing.date}</TableCell>
                    <TableCell>{borrowing.books.length}</TableCell>
                    <TableCell>
                      {borrowing.books.every((book) => book.returned)
                        ? "All Returned"
                        : "Some Not Returned"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewDetails(borrowing)}
                        variant="outlined"
                        color="primary"
                      >
                        View Details
                      </Button>
                      {borrowing.books.some((book) => !book.returned) &&
                      showMarkAsReturnedButton ? (
                        <Button
                          onClick={() => handleMarkAsReturned(index)}
                          variant="contained"
                          color="secondary"
                          sx={{
                              backgroundColor: "#98C1D3",
                              "&:hover": {
                                backgroundColor: "#7AA9BB",
                              },
                              ml: 2
                            }}
                        >
                          Mark as Returned
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No borrowings found for the selected date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedBorrowing} onClose={handleCloseDetails}>
        <DialogTitle>Borrowing Details</DialogTitle>
        <DialogContent>
          {selectedBorrowing && (
            <>
              <Typography>Date: {selectedBorrowing.date}</Typography>
              <Typography>Books:</Typography>
              {selectedBorrowing.books.length > 0 ? (
                selectedBorrowing.books.map((book, index) => (
                  <Typography key={index}>
                    {book.Title} - {book.returned ? "Returned" : "Not Returned"}
                  </Typography>
                ))
              ) : (
                <Typography>No books borrowed.</Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BorrowingHistoryPage;
