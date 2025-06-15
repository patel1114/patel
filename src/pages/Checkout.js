import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import PaymentForm from '../components/PaymentForm';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Here you would typically make an API call to your backend
      // to process the payment and create the order
      console.log('Payment successful:', paymentData);
      
      // Clear the cart and show success message
      clearCart();
      setPaymentStatus('success');
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/order-success');
      }, 3000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStatus('error');
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setPaymentStatus('error');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', borderRadius: 4 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography variant="subtitle1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
            <Box sx={{ mt: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {paymentStatus === 'success' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Payment successful! Redirecting to order confirmation...
            </Alert>
          )}

          {paymentStatus === 'error' && (
            <Alert severity="error" sx={{ mb: 3 }}>
              There was an error processing your payment. Please try again.
            </Alert>
          )}

          <PaymentForm
            amount={cartTotal}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" paragraph>
              If you have any questions about your order, please contact our
              customer service team.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate('/contact')}
            >
              Contact Support
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout; 