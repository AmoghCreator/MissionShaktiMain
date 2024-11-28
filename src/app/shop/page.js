"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
} from "@mui/material";

import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Loader from "@/lib/loader";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.post(
        "https://mission-shakti-419920.el.r.appspot.com/api/user/cart",
        {
          cart: [
            {
              _id: product._id,
              count: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${userToken || adminToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        mx: "auto",
        mb: 8,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        image={
          product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300"
        }
        alt={product.title}
        sx={{ objectFit: "cover", height: 200, width: 300 }}
      />
      <CardContent sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
        >
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%", backgroundColor: "#2e7d32" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://mission-shakti-419920.el.r.appspot.com/api/product/getAllProduct"
        );
        const { data } = response.data;
        setProducts(data.Product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <TopNav />
      <NavigationBar />
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", md: "25%" },
              bgcolor: "#f7f7f7",
              p: 4,
              borderRight: "1px solid #ddd",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "white" }}
            />
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Price Range
              </Typography>
              <Slider
                defaultValue={50}
                min={0}
                max={500}
                aria-label="Price Range"
                valueLabelDisplay="auto"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Categories
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Category 1"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Category 2"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Category 3"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Category 4"
                />
              </FormGroup>
            </Box>
          </Box>

          {/* Product Grid */}
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ width: { xs: "100%", md: "75%" }, p: 4 }}
          >
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ShopPage;

