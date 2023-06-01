import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
import checkoutState from "../page/features.js/checkout-state";
import { AppContext } from "../contexts/AppContext";


export default function ReviewForm() {
  const theme = useTheme();

  const { cartItems, userAddress, userData } = useContext(AppContext)

  const addresses = userData ? Object.values(userData) : [];
  const payment = checkoutState.payment;

  const totalAmount = cartItems.reduce((totalPrice, item) => (totalPrice + Number(item.price * item.quantity)), 0).toFixed(2)
  const discount = 10;

  console.log(userAddress)

  const payments = payment
    ? [
      {
        name: "Card type",
        detail: "Visa",
      },
      {
        name: "Card Number",
        detail: payment.cardNumber,
      },
      {
        name: "Card Holder",
        detail: payment.name,
      },
      {
        name: "Expiry Date",
        detail: payment.expDate,
      },
    ]
    : [];


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <List disablePadding>
        {
          cartItems?.map((product) => (
            <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: theme.spacing(2),
                  },
                }}
                primary={product.title}
                secondary={`Qty: ${product.quantity}`}
              />
              <Typography variant="body2">$ {product.price * product.quantity}</Typography>
            </ListItem>
          ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" secondary={`Discount: $ ${discount}`} />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            $ {(totalAmount - discount).toFixed(2)}
          </Typography>
        </ListItem>

      </List>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Mobile No:
          </Typography>
          <Typography gutterBottom>{userData.mobileNo}</Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid container>
            {payments.map(({ name, detail }) => (
              <>
                <Grid key={name} item xs={6}>
                  <Typography gutterBottom>{name}</Typography>
                </Grid>
                <Grid key={detail} item xs={6}>
                  <Typography gutterBottom>{detail}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}