import {
  Container,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import Header from "../component/Header";
import { AppContext } from "../contexts/AppContext";
import Filters from "../component/Filters";
import ProductContainer from "../component/ProductContainer";
import Loader from "../component/Loader";
import { useParams } from "react-router-dom";
import SideNav from "../component/SideNav";


function ProductPage() {
  const { category } = useParams()
  const { selectedCategories, sorting,
    products, searchTerm,
    setSelectedCategories,
    ratingValue, showSidenav } =
    useContext(AppContext)


  useEffect(() => {
    if (category) {
      setSelectedCategories([category])
    }
  }, [category, setSelectedCategories]);



  let filteredProducts = products;


  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category));
  }
  filteredProducts = filteredProducts.filter(
    (product) => product.rating.rate >= Number(ratingValue));
  filteredProducts.filter((product) =>
    searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if (sorting === 'highToLow') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sorting === 'lowToHigh') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (products.length === 0) return <Loader />
  return (
    <>

      <Header />
      <SideNav />
      <div className='product-container' >
        <Filters className='filter-container' />
        <Container sx={{ py: 8, display: showSidenav ? 'none' : 'block' }}
         maxWidth="lg" className="display-product" >
          <Grid container spacing={4}>
            {filteredProducts.filter((product) =>
              searchTerm === "" || product.title.toLowerCase()
              .includes(searchTerm.toLowerCase()))
              .map((product) => (
                <>
                  <ProductContainer product={product} />
                </>
              ))}
          </Grid>
        </Container>
      </div>
    </>
  )

}

export default ProductPage 
