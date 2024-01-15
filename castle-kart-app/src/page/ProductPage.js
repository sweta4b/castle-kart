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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const handlePageChange = (newPage) => {
    console.log(newPage)
    setCurrentPage(newPage);
  };

  console.log(currentPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const productsToShow = filteredProducts.slice(startIndex, endIndex)

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <SideNav /> */}
          
          <div className="product-container md:max-w-[1480px] max-w-[600px]  m-auto w-full h-full">
            <div className="filter-container">
            <Filters />
            </div>
            <Container
             
              sx={{ py: 8}}
              // maxWidth="lg"
              className="display-product "
            >
              <div style={{ marginBottom: '5px' }}><h4>Total Products: {filteredProducts.length}</h4></div>
              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <ProductContainer key={product.id} product={product} />
                ))}
              </Grid>
               {/* <Pagination handlePageChange={handlePageChange} currentPage={currentPage} filteredProducts={filteredProducts} itemsPerPage={itemsPerPage} /> */}
            </Container>
          </div>
          
        </>
      )}
    </>
  );
}

const Pagination = ({handlePageChange,currentPage, filteredProducts, itemsPerPage }) => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
      <button style={{width:'40px', height:'40px', borderRadius:'50%', backgroundColor: 'brown', color:'white'}}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        prev
      </button>
      <span>{currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}</span>

      <button style={{width:'40px', height:'40px', borderRadius:'50%', backgroundColor: 'brown', color:'white'}}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
      >
        next
      </button>

    </div>
  )
}

export default ProductPage;

