import { ShoppingCartSharp } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import { AppContext } from '../contexts/AppContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Favorite from '@mui/icons-material/Favorite';


export default function Cart() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, wishListItems, addToWishList } = useContext(AppContext)
    const theme = useTheme();
    const navigate = useNavigate()


    const totalAmount = cartItems.reduce((totalPrice, item) => (totalPrice + Number(item.price * item.quantity)), 0).toFixed(2)
    const discount = 10


    return (
        <>
            <Header />
            <Container sx={{ py: 8 }}>
                <Grid container spacing={2}>
                    <Grid item container spacing={2} md={8}>
                        {cartItems.length === 0 && <h1>Your Cart is Empty</h1>}
                        {cartItems.map((item) => {
                            const { title, id, description, price, rating, image, quantity } = item;
                            return (
                                <Grid item key={id} xs={12}>
                                    <Card sx={{
                                        display: "flex",
                                        flexWrap:'wrap',
                                        py: 2,
                                    }}>
                                        <CardMedia component="img" image={image} sx={{
                                            width: theme.spacing(30),
                                            height: theme.spacing(30),
                                            objectFit: "contain",
                                            pt: theme.spacing(),
                                        }}
                                            alt={title}
                                        />
                                        <CardContent sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flex: 1,
                                        }}>
                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2
                                            }}>
                                                <Typography variant='h6'>{title}</Typography>
                                                <Typography
                                                    paragraph
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: "2",
                                                        WebkitBoxOrient: "vertical",
                                                    }}
                                                >
                                                    {description}
                                                </Typography>
                                                <Typography paragraph fontSize="large">
                                                    <b>Price:</b> $ {price}
                                                </Typography>
                                                <Rating readOnly precision={0.5} value={rating.rate} />
                                                <div>
                                                    <button onClick={() => decreaseQuantity(item.title)} style={{
                                                        width: 'fit-content',
                                                        background: 'white',
                                                        border: 'none',
                                                        display: 'inline'
                                                    }}>
                                                        <RemoveCircleIcon sx={{ color: 'brown', fontSize: 'medium' }} />
                                                    </button>
                                                    <p style={{
                                                        display: 'inline',
                                                        fontSize: '20px'
                                                    }}><b >{quantity}</b>
                                                    </p>
                                                    <button onClick={() => increaseQuantity(item.title)} style={{
                                                        width: 'fit-content',
                                                        backgroundColor: 'white',
                                                        border: 'none',
                                                        color: 'white',
                                                        display: 'inline'
                                                    }}>
                                                        <AddCircleIcon sx={{ color: 'brown', fontSize: 'medium' }} />
                                                    </button>
                                                </div>
                                                <Button variant="contained" onClick={() => removeFromCart(id)}
                                                    sx={{
                                                        backgroundColor: 'brown',
                                                        width: "250px",
                                                        "&": {
                                                            ":hover": {
                                                                backgroundColor: 'black'
                                                            }
                                                        }
                                                    }}>
                                                    <ShoppingCartSharp />
                                                    Remove from Cart
                                                </Button>
                                                {wishListItems.includes(item) ? <Button variant="contained" onClick={() => navigate("/wishlist")} sx={{
                                                    backgroundColor: 'brown', width: "250px",
                                                    "&": {
                                                        ":hover": {
                                                            backgroundColor: 'black'
                                                        }
                                                    }
                                                }}>
                                                    <Favorite />
                                                    Already in wishList
                                                </Button> :
                                                    <Button variant="contained" onClick={() => addToWishList(item)} sx={{
                                                        backgroundColor: 'brown', width: "250px",
                                                        "&": {
                                                            ":hover": {
                                                                backgroundColor: 'black'
                                                            }
                                                        }
                                                    }}>
                                                        <Favorite />
                                                        Add to wishList
                                                    </Button>
                                                }
                                            </Box>
                                            <Box>
                                                <Typography variant='h6' paragraph>
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item md={4} sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            width: "100%",
                        }}>
                            <Card sx={{
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <Typography sx={{ textAlign: 'center' }}><b>Price Details</b></Typography>
                                <hr />
                                <Typography><b>Price({cartItems.length} item):</b>  <span style={{ textAlign: 'right' }}>$ {totalAmount}</span></Typography>
                                <Typography><b>Discount:</b> $ {discount}</Typography>
                                <Typography><b>Delivery Charges:</b>  Free</Typography>
                                <hr />
                                <Typography variant="h6" >Subtotal: <b > $ {totalAmount > 0 && (totalAmount - discount).toFixed(2)}</b></Typography>
                                <hr />
                                <Typography sx={{ textAlign: 'center' }}><b>You will save $10 on this order</b></Typography>
                                {totalAmount > 0 ? <Button variant='contained' sx={{
                                    backgroundColor: 'brown', "&": {
                                        ":hover": {
                                            backgroundColor: 'black'
                                        }
                                    }
                                }} onClick={() => navigate("/checkout")}>Buy Now</Button> : <Button variant='contained' sx={{
                                    backgroundColor: 'brown', "&": {
                                        ":hover": {
                                            backgroundColor: 'black'
                                        }
                                    }
                                }} onClick={() => navigate("/")}>Shop Products</Button>}
                            </Card>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


