import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import checkoutState, { updatePayment } from "../page/features.js/checkout-state";


export default function PaymentsForm() {

    const payment = checkoutState.payment;
  
  function handleChange(event) {
    const { name, value } = event.target ?? {};
    console.log(name, value);
    updatePayment({ [name]: value });
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Box component="form" onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              id="name"
              variant="standard"
              required
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              defaultValue={payment?.name ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="cardNumber"
              id="cardNumber"
              variant="standard"
              required
              label="Card Number"
              fullWidth
              autoComplete="cc-number"
              defaultValue={payment?.cardNumber ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="expDate"
              id="expDate"
              variant="standard"
              required
              label="Expiry Date"
              fullWidth
              autoComplete="cc-exp"
              defaultValue={payment?.expDate ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="cvv"
              id="cvv"
              variant="standard"
              required
              label="CVV"
              type="password"
              fullWidth
              autoComplete="cc-csc"
              defaultValue={payment?.cvv ?? ""}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}