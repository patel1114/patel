import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import BackButton from '../components/BackButton';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            size={isMobile ? "medium" : "large"}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton to="/products" label="Continue Shopping" />
      
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        component="h1" 
        gutterBottom
        sx={{ mt: 2 }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card sx={{ mb: 2 }}>
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ 
                        height: isMobile ? 120 : 140, 
                        objectFit: 'cover' 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Typography 
                            variant={isMobile ? "subtitle1" : "h6"}
                            sx={{ mb: 1 }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₹{item.price.toLocaleString('en-IN')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Stack 
                            direction="row" 
                            alignItems="center" 
                            spacing={1}
                            sx={{ 
                              justifyContent: isMobile ? 'space-between' : 'flex-start',
                              maxWidth: isMobile ? '200px' : 'none'
                            }}
                          >
                            <IconButton
                              size={isMobile ? "small" : "medium"}
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                            >
                              <Remove />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              type="number"
                              inputProps={{ 
                                min: 1,
                                style: { 
                                  textAlign: 'center',
                                  padding: isMobile ? '4px' : '8px'
                                }
                              }}
                              sx={{ 
                                width: isMobile ? 50 : 60,
                                '& .MuiOutlinedInput-root': {
                                  height: isMobile ? 32 : 40
                                }
                              }}
                            />
                            <IconButton
                              size={isMobile ? "small" : "medium"}
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <Add />
                            </IconButton>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography 
                            variant={isMobile ? "subtitle1" : "h6"}
                            sx={{ 
                              color: 'primary.main',
                              fontWeight: 'bold'
                            }}
                          >
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <IconButton
                            color="error"
                            size={isMobile ? "small" : "medium"}
                            onClick={() => removeFromCart(item.id)}
                            sx={{ 
                              position: isMobile ? 'absolute' : 'static',
                              top: 8,
                              right: 8
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </motion.div>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: isMobile ? 2 : 3,
              position: isMobile ? 'sticky' : 'static',
              bottom: 0,
              zIndex: 1
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom
            >
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="body1">Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant={isMobile ? "subtitle1" : "h6"}>
                    Total
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"}
                    color="primary"
                  >
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Stack spacing={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 