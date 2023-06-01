import React, { useContext, useState } from 'react'
import Header from '../component/Header'
import { AppContext } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'

function ShowAllAdress() {
  
  const { userAddress, setUserAddress } = useContext(AppContext)
  const [isActive, setIsActive] = useState(false)
  const { user } = useAuth()

  function deleteAddress1(name) {
    setUserAddress((userAddress) => userAddress.filter(({ firstName }) => firstName !== name))
  }

  function addNewAdress(event) {
    event.preventDefault();
    const { firstName, lastName, zipCode, address2, address1, city, mobileNo, country } = event.target

    const newAddress = {
      firstName: firstName.value,
      lastName: lastName.value,
      zipCode: zipCode.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      country: country.value,
      mobileNo: mobileNo.value
    }
   
      setUserAddress((userAddress) => [...userAddress, newAddress])
   
  }

 

  return (<>
    <Header />

    <div className="account-container" style={{ display: isActive ? 'none' : 'block' }}>
      <h2 className='account'>My Account</h2>
      <h3>Account Details </h3>
      <div className='account-detail' >
        <h4>{user.firstName} {user.lastName}</h4>
        <h4>{user.email}</h4>
      </div>
      <h3>Address Details</h3>
      <div className='adress-detail' >
        {
          userAddress.map((address) => (
            <>
              <h4>{address.firstName} {address.lastName}</h4>
              <p>{address.address1}, {address.address2}</p>
              <p>{address.city} {address.zipCode}, {address.country}</p>
              <p>{address.mobileNo}</p>
              <div className='account-btn'>
                <button onClick={() => deleteAddress1(address.firstName)} className='update'>Delete</button>
              </div>
            </>
          ))
        }
      </div>
      <button className='update' onClick={() => setIsActive(!isActive)}> + Add New Address</button>
    </div>
    <div className=" addressForm">
      <form style={{ display: isActive ? 'block' : 'none' }} onSubmit={addNewAdress}>
        <div className='inputArea' >
          <h3 className='newAddress'>Add New Address</h3>
          <input placeholder='Firstname'
            required
            name='name'
            id='firstName'
            style={{
              width: '90%',
              padding: '5px'

            }}
          />
        </div>
        <div className='inputArea'>
          <input placeholder='Lastname'
            required
            name='name'
            id='lastName'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>
          <input placeholder='Address (house No, Colony)'
            required
            name='address1'
            id='address1'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>
          <input placeholder='Locality/Town '
            required
            name='address2'
            id='address2'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>
          <input placeholder='City'
            required
            name='city'
            id='city'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>
          <input placeholder='Zip Code'
            required
            name='zipCode'
            id='zipCode'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>
          <input placeholder='Country'
            required
            name='country'
            id='country'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <div className='inputArea'>

          <input placeholder='Mobile No.'
            required
            name='mobileno'
            id='mobileNo'

            style={{
              width: '90%',
              padding: '5px'
            }} />
        </div>
        <button className='update2' onClick={() => setIsActive(!isActive)}>Save</button>
      </form>
    </div>

  </>
  )
}


export default ShowAllAdress
