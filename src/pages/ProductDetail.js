import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
  Rating,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import BackButton from '../components/BackButton';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Product not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton to="/products" label="Back to Products" />
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: isMobile ? '50vh' : '70vh',
                objectFit: 'contain',
              }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1" 
              gutterBottom
            >
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={product.rating} 
                precision={0.1} 
                readOnly 
                size={isMobile ? "small" : "medium"}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            <Chip
              label={product.category}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="primary" 
              gutterBottom
            >
              ₹{product.price.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Features:
            </Typography>
            <ul style={{ paddingLeft: isMobile ? '1rem' : '2rem' }}>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </li>
              ))}
            </ul>
            <Stack 
              direction={isMobile ? "column" : "row"} 
              spacing={2} 
              sx={{ mt: 4 }}
            >
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: isMobile ? '100%' : 100 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={quantity > product.stock}
                fullWidth={isMobile}
              >
                Add to Cart
              </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {product.stock > 0
                ? `${product.stock} items in stock`
                : 'Out of stock'}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail; 