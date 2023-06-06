
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddressForm from '../component/AddressForm';
import Header from '../component/Header'
import PaymentsForm from '../component/PaymentForm';
import ReviewForm from '../component/ReviewForm';
import { AppContext } from '../contexts/AppContext';
import { clearCheckoutInformation } from './features.js/checkout-state';

const steps = ["Shipping Address", "Payment Details", "Review Order"];

function getStepContent(activeStep) {
  switch (activeStep) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentsForm />;
    case 2:
      return <ReviewForm />;
    default:
      throw new Error("Unknown step");
  }
}

function Order() {
  const { clearCart, isSelected } = useContext(AppContext)
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    if (activeStep === steps.length) {
      clearCart();
      clearCheckoutInformation();
    }
  }, [activeStep, clearCart]);

  function handleNext() {
    isSelected ? 
    setActiveStep(activeStep + 1) : toast("Select Address", {
      position: 'bottom-right',
      autoClose: 2000,
  });
  }
  function handleBack() {
    setActiveStep(activeStep - 1);
  }


  return (
    <>
      <Header />
      <Container
        component="section"
        maxWidth="lg"
        sx={{
          mb: 4,
        }}
      >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              pt: 3,
              pb: 5,
            }}
          >
            {steps.map((label) => (
              <Step key={label}  >
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order
              </Typography>
              <Typography>
                Your order number is #12234. We have emailed you the details regarding your order confirmation.
              </Typography>
              <Button variant='contained' sx={{
                backgroundColor: 'brown', marginTop: '10px',
                "&": {
                  ":hover": {
                    backgroundColor: 'black'
                  }
                }
              }} onClick={() => navigate("/")}>Shop More</Button>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button
                    sx={{
                      mt: 3,
                      ml: 1,
                      backgroundColor: 'brown',
                      "&": {
                        ":hover": {
                          backgroundColor: 'black'
                        }
                      }
                    }}
                    onClick={handleBack}
                    variant="contained"

                  >
                    Back
                  </Button>
                )}
                <Button type="submit"
                  sx={{
                    mt: 3,
                    ml: 1,
                    backgroundColor: 'brown',
                    "&": {
                      ":hover": {
                        backgroundColor: 'black'
                      }
                    }
                  }}
                  onClick={handleNext}
                  variant="contained"
                >
                  {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}

export default Order
