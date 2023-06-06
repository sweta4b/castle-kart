import { Favorite, ShoppingCartSharp } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import Header from '../component/Header';
import { AppContext } from '../contexts/AppContext';

function WishList() {

  const theme = useTheme();
  const { wishListItems, removeFromWishList, addToCart, isInCart } = useContext(AppContext)

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishList(item.id)
  }

  return (
    <>
      <Header />
      <Container sx={{ py: 8 }} >
      {wishListItems.length === 0 && <h1 style={{textAlign: 'center'}}>Your Wishlist is Empty</h1>}
        <Grid container spacing={2} >
        
          <Grid item container spacing={2} md={8} sx={{ margin:'auto'}} >
            {wishListItems.map((item) => {
              const { title, id, description, price, rating, image } = item;
              return (
                <Grid item key={id} xs={12} sx={{ margin:'auto'}}>
                  <Card sx={{
                    display: "flex",
                    py: 2,
                    flexWrap:'wrap',
                    margin:'auto',
                  }}  >

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
                          Description: {description}
                        </Typography>
                        <Typography paragraph fontSize="large">
                          $ {price}
                        </Typography>
                        Rating:
                        <Rating readOnly precision={0.5} value={rating.rate} />
                        <Button variant="contained" onClick={() => removeFromWishList(id)} sx={{
                          backgroundColor: 'brown', width: "250px", gap:'10px', fontSize:'small',
                          "&": {
                            ":hover": {
                              backgroundColor: 'black'
                            }
                          }
                        }}>
                          <Favorite />
                          Remove from Wishlist
                        </Button>
                        {isInCart(item.id) ? <Button variant="contained" onClick={() => moveToCart(item)} sx={{
                          backgroundColor: 'brown', width: "250px", gap:'10px',fontSize:'small',
                          "&": {
                            ":hover": {
                              backgroundColor: 'black'
                            }
                          }
                        }}>
                          <ShoppingCartSharp />
                          Go to cart
                        </Button> :
                          <Button variant="contained" onClick={() => moveToCart(item)} sx={{
                            backgroundColor: 'brown', width: "250px", gap:'10px',
                            fontSize:'small',
                            "&": {
                              ":hover": {
                                backgroundColor: 'black'
                              }
                            }
                          }}>
                            <ShoppingCartSharp />
                            Move To Cart
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
        </Grid>

      </Container>

    </>
  )
}

export default WishList
