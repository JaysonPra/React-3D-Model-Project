import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Modal,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleOpen = (imgSrc) => {
    setSelectedImage(imgSrc);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const images = [
    { src: "./image1.jpg", alt: "Gallery Image 1" },
    { src: "./image2.jpg", alt: "Gallery Image 2" },
    { src: "./image3.jpg", alt: "Gallery Image 3" },
    { src: "./image4.jpg", alt: "Gallery Image 4" },
    { src: "./image5.jpg", alt: "Gallery Image 5" },
  ];

  return (
    <Container maxWidth="2xl" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Photo Gallery
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <GalleryItem
            image={images[0]}
            onClick={() => handleOpen(images[0].src)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <GalleryItem
            image={images[1]}
            onClick={() => handleOpen(images[1].src)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <GalleryItem
            image={images[2]}
            onClick={() => handleOpen(images[2].src)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GalleryItem
            image={images[3]}
            onClick={() => handleOpen(images[3].src)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GalleryItem
            image={images[4]}
            onClick={() => handleOpen(images[4].src)}
          />
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal"
        aria-describedby="enlarged-image-view"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "70%" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={selectedImage}
            alt="Enlarged view"
            style={{
              maxWidth: "100%",
              maxHeight: "85vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

const GalleryItem = ({ image, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        height: { xs: 240, sm: 320, md: 400 },
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          transition: "all 0.3s ease",
          "&:hover": { opacity: 1 },
        }}
        onClick={onClick}
      >
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
          }}
        >
          <ZoomOutMapIcon />
        </IconButton>
      </Box>

      <img
        src={image.src}
        alt={image.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Paper>
  );
};

export default Gallery;
