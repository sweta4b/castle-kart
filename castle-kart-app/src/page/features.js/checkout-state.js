let checkoutState = {
    address: {
        firstName: 'Haley',
        lastName:'Mitchell',
        address1:'499 Nobel Avenue',
        address2:'Near Opera House',
        city:'Sun Valley',
        zipCode:'54782',
        country:'US',
        mobileNo: '9876543210'
    },
    payment: {
      name: 'Haley Mitchell',
      cardNumber: '123456789',
      expDate: '10/29',
      cvv: 123
    }
  };
  
  const updateAddress = (payload) => {
    checkoutState.address = { ...checkoutState.address, ...payload };
  };
  
  const updatePayment = (payload) => {
    checkoutState.payment = { ...checkoutState.payment, ...payload };
  };
  
  const clearCheckoutInformation = () => {
    checkoutState.address = {};
    checkoutState.payment = {};
  };
  
  export { updateAddress, updatePayment, clearCheckoutInformation };
  export default checkoutState;
  