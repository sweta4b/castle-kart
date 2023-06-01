import "./App.css";
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./page/Home";
import ProductPage from "./page/ProductPage";
import Cart from "./page/Cart";
import WishList from "./page/WishList";
import SingleProduct from "./page/SingleProduct";
import Checkout from "./page/Checkout";
import Order from "./page/Order";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { useAuth } from "./contexts/AuthContext";
import Mockman from "mockman-js"
import ShowAllAdress from "./page/ShowAllAdress";


function ProtectedRoute({children}){
  const {user} = useAuth();
  if(!user){
    return <Navigate to={"/login"}/>
  }
  return children
}


function App() {
  return (
    <div className="App">
         <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:category?" element={<ProductPage/>}/>
        <Route path="/mockman" element={<Mockman/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>

        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/products/:productId" element={<SingleProduct/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/adress" element={<ShowAllAdress/>}/>
      </Routes>
    </div>
  );
}

export default App;
