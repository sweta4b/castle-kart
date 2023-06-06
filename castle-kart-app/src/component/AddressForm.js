import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function AddressForm() {
  const { userAddress, setUserData, setIsSelected } = useContext(AppContext)
  const navigate = useNavigate()

  function fillTheAddresForm(index) {
    const selectedAddress = userAddress[index]
    setUserData(selectedAddress)
    setIsSelected(true)
  }

  return (
    <>
      {userAddress.length === 0 ? <Button onClick={() => navigate("/adress")}>Add New Address</Button> :
      userAddress.map((useraddress, index) => (
        <div className="selectedAddress">
          <label>
            <input type='radio' onChange={() => fillTheAddresForm(index)} name="name" /> {useraddress.firstName} {useraddress.lastName},
            {useraddress.address1}, {useraddress.address2},
            {useraddress.city}, {useraddress.zipCode},
            {userAddress.country}
          </label>
          <p>{useraddress.mobileNo}</p>
        </div>
      ))}
    </>
  );
}