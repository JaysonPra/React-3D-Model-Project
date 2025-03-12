import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <>
      <Box padding={4}>
        <Typography
          variant="h4"
          textAlign="center"
          color="#f3e5f5"
          paddingBottom={2}
          sx={{ textDecoration: "underline" }}
        >
          Get in Touch
        </Typography>
        <Typography variant="body1" textAlign="center" color="#cfcfcf">
          We'd love to hear from you! Reach out using the form or contact
          details below.
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        padding={4}
      >
        <Box
          flex={1}
          padding={3}
          bgcolor="#1e1e1e"
          borderRadius="8px"
          boxShadow={3}
          margin={{ xs: 2, md: 0 }}
        >
          <Typography variant="h5" gutterBottom color="#f3e5f5">
            Address
          </Typography>
          <Typography variant="body1" color="#cfcfcf">
            <strong>Our Store:</strong> Lagankhel, Lalitpur
          </Typography>
          <Typography variant="body1" color="#cfcfcf">
            <strong>Phone:</strong> 01-54232889
          </Typography>
          <Typography
            variant="body1"
            color="#cfcfcf"
            sx={{ textDecoration: "underline" }}
          >
            <strong>Email:</strong> info@ourstore.com
          </Typography>
          <Typography
            variant="body1"
            color="#cfcfcf"
            sx={{ textDecoration: "underline" }}
          >
            <strong>Website:</strong> www.ourstore.com
          </Typography>
        </Box>

        <Box
          flex={1}
          padding={3}
          bgcolor="#2b2b2b"
          borderRadius="8px"
          boxShadow={3}
          margin={{ xs: 2, md: 0 }}
        >
          <Typography
            variant="h5"
            color="#f3e5f5"
            textAlign="center"
            gutterBottom
          >
            Send Us a Message
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                placeholder="Enter your email here"
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfcfcf" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                placeholder="Enter your subject here"
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: "#cfcfcf" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                placeholder="Write your message here"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                InputLabelProps={{ style: { color: "#cfcfcf" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#673ab7",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#5e35b1" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
