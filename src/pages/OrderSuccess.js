import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <CheckCircleOutline
            sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Order Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been received and is being
            processed.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We'll send you an email confirmation with your order details shortly.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/orders')}
            >
              View Orders
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default OrderSuccess; 