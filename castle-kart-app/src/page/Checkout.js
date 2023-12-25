
import { Box, Button, Card, Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import { AppContext } from '../contexts/AppContext'

function Checkout() {
    const navigate = useNavigate()
    const { cartItems } = useContext(AppContext)

    const totalAmount = cartItems.reduce((totalPrice, item) =>
        (totalPrice + Number(item.price * item.quantity)), 0).toFixed(2)
    const discount = 10;

    return (
        <div>
            <Header />
                <Container sx={{py: 8, width:'fit-content'}}>
                <Box sx={{
                    width: "100%",
                }}>
                    <Card sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        <hr/>
                        <Typography sx={{textAlign:'center'}}><b>Order details</b></Typography>
                        <hr/>
                        {cartItems.map(({title}) => <li key={title} style={{listStyle:'none'}}>{title}</li>)}
                        <hr/>
                        <Typography sx={{ textAlign: 'center' }}><b>Price Details</b></Typography>
                        <hr />
                        <Typography><b>Price({cartItems.length} item):</b>
                            <span style={{
                                textAlign: 'right'
                            }}>
                                $ {totalAmount}</span>
                        </Typography>
                        <Typography><b>Discount:</b>
                            $ {discount}
                        </Typography>
                        <Typography><b>Delivery Charges:</b>
                            Free
                        </Typography>
                        <hr />
                        <Typography variant="h6" >Subtotal: <b >
                            $ {totalAmount > 0 && (totalAmount - discount).toFixed(2)}</b>
                        </Typography>
                        <hr />
                        <Typography sx={{ textAlign: 'center' }}><b>You will save $10 on this order</b>
                        </Typography>
                         <Button variant='contained' sx={{
                            backgroundColor: 'brown', "&": {
                                ":hover": {
                                    backgroundColor: 'black'
                                }
                            }
                        }} onClick={() => navigate("/order")}>Place Order</Button> 
                    </Card>
                </Box>
                </Container>
        </div>
        
    )
}

export default Checkout
