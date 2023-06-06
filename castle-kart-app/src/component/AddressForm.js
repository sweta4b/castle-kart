import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { updateAddress } from "../page/features.js/checkout-state";
import { AppContext } from "../contexts/AppContext";


export default function AddressForm() {
  const { userAddress, setUserData, userData } = useContext(AppContext)
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
 


  function handleChange(event) {
    const { name, value } = event.target ?? {};
    updateAddress({ [name]: value });
  }

  console.log(userAddress)

  function fillTheAddresForm(index) {
    const selectedAddress = userAddress[index]
    setSelectedAddressIndex(index);
    setUserData(selectedAddress)
  }

  
  

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Addresss
      </Typography>
      <Box component="form" onSubmit={handleChange} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].firstName : userData.firstName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].lastName : userData.lastName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].address1 : userData.address1 || ""}
              required
              id="address1"
              name="address1"
              label="Address Line 1"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].address2 : userData.address2 || ""}
              required
              id="address2"
              name="address2"
              label="Address Line 2"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].city : userData.city || ""}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].zipCode : userData.zipCode || ""}
              required
              id="zipCode"
              name="zipCode"
              label="Zip Code/Postal Code"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={selectedAddressIndex !== null ? userAddress[selectedAddressIndex].country : userData.country || ""}
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6" sx={{ my: 2 }}>Select address</Typography>
      {userAddress.map((useraddress, index) => (
        <>
        <div className="selectedAddress">
          <label><input type='radio' onChange={() => fillTheAddresForm(index)} name="name" />
            {useraddress.firstName} {useraddress.lastName},
            {useraddress.address1}, {useraddress.address2},
            {useraddress.city}, {useraddress.zipCode},
            {userAddress.country}
          </label>
          <p>{useraddress.mobileNo}</p>
        </div>
         </>
      ))}

     
    </>
  );
}