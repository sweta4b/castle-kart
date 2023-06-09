import {
  Container,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import { AppContext } from "../contexts/AppContext";
import Filters from "../component/Filters";
import ProductContainer from "../component/ProductContainer";
import Loader from "../component/Loader";
import { useParams } from "react-router-dom";
import SideNav from "../component/SideNav";


function ProductPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const {
    selectedCategories,
    sorting,
    products,
    searchTerm,
    setSelectedCategories,
    ratingValue,
    showSidenav
  } = useContext(AppContext);

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category, setSelectedCategories]);

  let filteredProducts = products;

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }
  filteredProducts = filteredProducts.filter(
    (product) => product.rating.rate >= Number(ratingValue)
  );
  filteredProducts = filteredProducts.filter((product) =>
    searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sorting === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sorting === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (products.length === 0) return <Loader />;

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SideNav />
          <div className="product-container">
            <Filters className="filter-container" />
            <Container
              sx={{ py: 8, display: showSidenav ? "none" : "block" }}
              maxWidth="lg"
              className="display-product"
            >
              <div style={{marginBottom:'5px'}}><h4>Total Products:</h4> <h5>({filteredProducts.length} products)</h5></div>
              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <ProductContainer key={product.id} product={product} />
                ))}
              </Grid>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default ProductPage;

