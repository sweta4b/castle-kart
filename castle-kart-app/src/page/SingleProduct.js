import { Favorite, ShoppingCartSharp } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Container, Rating, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../component/Header';
import { AppContext } from '../contexts/AppContext';

function SingleProduct() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { productId } = useParams();
  const { products, addToCart, wishListItems, addToWishList, isInCart } = useContext(AppContext)

  const filteredProduct = products.find((product) => product.id === productId)

  return (
    <>
      <Header />
      <Container sx={{ py: 8 }} >
        <Box container spacing={2} >
          <Box item container spacing={2} md={8} >
            <Box item key={filteredProduct.id} xs={12} >
              <Card sx={{
                display: "flex",
                py: 2,
                flexWrap:'wrap',
                width: {
                    xs: 300,
                    sm: 400,
                    md:800,
                    lg:800,
                    xl:900,
                },
                height: "fit-content",
                margin:'auto'
              }} >
                <CardMedia component="img" image={filteredProduct.image} sx={{
                  width: theme.spacing(30),
                  height: theme.spacing(30),
                  objectFit: "contain",
                  pt: theme.spacing(),
                }}
                  alt={filteredProduct.title}
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
                    <Typography variant='h6'>Title: {filteredProduct.title}</Typography>
                    <Typography
                      paragraph
                      color="text.secondary"
                      sx={{
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      
                      }}
                    >
                      <b>Description:</b> {filteredProduct.description}
                    </Typography>
                    <Typography paragraph fontSize="large">
                      Price: $ {filteredProduct.price}
                    </Typography>

                    <b>Rating:</b>  <Rating readOnly precision={0.5} value={filteredProduct.rating.rate} />
                    {isInCart(filteredProduct.id) ? <Button className='wishlist-btn' variant="contained" onClick={() => navigate("/cart")}
                      sx={{
                        backgroundColor: 'brown', width: "200px",
                        fontSize:'12px',
                        "&": {
                          ":hover": {
                            backgroundColor: 'black'
                          }
                        }
                      }}>
                      <ShoppingCartSharp />
                       Go to Cart
                    </Button> : <Button variant="contained" onClick={() => addToCart(filteredProduct)}
                      sx={{
                        backgroundColor: 'brown', width: "200px",
                        fontSize:'12px',
                        "&": {
                          ":hover": {
                            backgroundColor: 'black'
                          }
                        }
                      }}>
                      <ShoppingCartSharp />
                       Add to Cart
                    </Button>}
                    {wishListItems.includes(filteredProduct) ? <Button variant="contained" onClick={() => navigate("/wishlist")}
                      sx={{
                        backgroundColor: 'brown', width: "200px",
                        fontSize:'12px',
                        "&": {
                          ":hover": {
                            backgroundColor: 'black'
                          }
                        }
                      }}>
                      <Favorite />
                      Go to WishList
                    </Button> : <Button variant="contained" onClick={() => addToWishList(filteredProduct)}
                      sx={{
                        backgroundColor: 'brown', width: "200px",
                        fontSize:'12px',
                        "&": {
                          ":hover": {
                            backgroundColor: 'black'
                          }
                        }
                      }}>
                      <Favorite />
                      Add to WishList
                    </Button>}

                  </Box>
                  <Box>
                    <Typography variant='h6' paragraph>

                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SingleProduct
