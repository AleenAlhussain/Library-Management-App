import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import back_img from "../images/6920933.jpg";
const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
        p: { xs: "66px 0px 0px", sm: 8 },
      }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "14px", md: "18px" },
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: "gold !important",
                  mr: 1,
                  fontSize: { xs: "18px", md: "24px" },
                }}
              >
                ★
              </Typography>
              Start Your Reading Journey Today
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "28px", md: "48px" },
            }}
          >
            Where Every Page is a new Adventure
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mt: 2,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Discover a world of knowledge and adventure through our extensive
            collection of books.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Box
            sx={{
              backgroundImage: `url(${back_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: { xs: "100%", sm: "100%", md: "90%" },
              height: { xs: "395px", sm: "350px", md: "450px" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
