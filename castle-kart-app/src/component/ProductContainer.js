import { ShoppingCartSharp } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';


function ProductContainer({ product }) {

    const navigate = useNavigate();
    const theme = useTheme();
    const {
        addToCart,
        addToWishList,
        wishListItems,
        removeFromWishList,
        isInCart,
    } = useContext(AppContext)

    const handleWishList = (item) => {
        wishListItems.includes(item) ? removeFromWishList(item.id) : addToWishList(item)
    }

    return (
        <Grid item key={product.id} xs={12} sm={6} md={3} >
            <Card className="card"
                sx={{ height: "100%", display: "flex", flexDirection: "column"
               }}>
                <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => handleWishList(product)} >
                    <FavoriteIcon className="favorite" sx={{ color: wishListItems.includes(product) ? 'brown' : "" }} />
                </IconButton>
                <CardMedia onClick={() => navigate(`/products/${product.id}`)}
                    component="img"
                    sx={{
                        alignSelf: "center",
                        width: theme.spacing(30),
                        height: theme.spacing(30),
                        objectFit: "contain",
                        pt: theme.spacing(),
                    }}
                    image={product.image}
                    alt={product.title}
                />
                <CardContent >
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Typography paragraph fontSize="large">
                        <b>$</b> {product.price}
                    </Typography>
                    <Rating readOnly precision={0.5} value={product.rating.rate} sx={{zIndex: 1000}}/>
                </CardContent>
                <CardActions sx={{
                    alignSelf: "center",
                }}>
                    {isInCart(product.id) ?
                        <Button variant="contained" onClick={() => navigate("/cart")} sx={{
                            backgroundColor: 'brown',
                            "&": {
                                ":hover": {
                                    backgroundColor: 'black'
                                }
                            }
                        }}>
                            <ShoppingCartSharp />
                            Go to Cart
                        </Button> :
                        <Button variant="contained" onClick={() => addToCart(product)} sx={{
                            backgroundColor: 'brown', 
                            
                            "&": {
                                ":hover": {
                                    backgroundColor: 'black'
                                }
                            }
                        }}>
                            <ShoppingCartSharp />
                            Add to Cart
                        </Button>}
                </CardActions>
                <Button sx={{ color: 'brown' }} className="lineUp"
                    onClick={() => navigate(`/product/${product.id}`)}>
                    Quick View
                </Button>
            </Card>
        </Grid>
    )
}

export default ProductContainer
