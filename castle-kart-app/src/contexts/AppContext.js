import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import checkoutState from "../page/features.js/checkout-state";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();


export default function AppProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [wishListItems, setWishListItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [ratingValue, setRatingvalue] = useState(0);
    const [sorting, setSorting] = useState('');
    const [userAddress, setUserAddress] = useState([checkoutState.address]);
    const [userData, setUserData] = useState({});
    const[showSidenav, setShowSidenav] = useState(false)
    const navigate = useNavigate();
   
    


    useEffect(() => {
        axios.get("/api/categories").then((response) => setCategories(response.data.categories));
    }, [])

    useEffect(() => {
        axios.get("/api/products").then((response) => setProducts(response.data.products));
    }, [])


   // toggleSidenave
   const toggleSideNav = () => {
    setShowSidenav(!showSidenav)
   }

    // clear all the filters
    const clearFilters = () => {
        setSelectedCategories([]);
        setRatingvalue(0);
        setSorting('');
        setSearchTerm('');
      };

    //set the rating value
    const handleRating = (event) => {
        console.log((event.target.value))
        setRatingvalue(event.target.value)
    }

    // filter by category
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
          setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
          setSelectedCategories([...selectedCategories, category]);
        }
      };

    // Function to handle "Add to Cart" button click
    const addToCart = (product) => {
        const existingCartItem = cartItems.find(item => item.title === product.title);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item =>
                item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCartItems);
        } else {
            const newCartItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
        }
        toast("Added to cart", {
            position: 'bottom-right',
            autoClose: 2000,
        });
    };

    // Function to handle quantity decrease
    const decreaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item =>
            item.title === productName && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
    };


    // Function to handle quantity increase
    const increaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item =>
            item.title === productName ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    }

    // To check the item is in cart or not
    const isInCart = (id) => cartItems.find((product) => product.id === id);

    // function to remove the item from the cart
    function removeFromCart(id) {
        setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
        toast("Removed from cart", {
            position: 'bottom-right',
            autoClose: 2000,
        });
    }

    // function to clear the cart after the order is placed
    function clearCart() {
        setCartItems([]);
    }

    //function to add item in wishlist
    function addToWishList(item) {
        setWishListItems((wishListItems) => [...wishListItems, item]);
        toast("Added to wishlist", {
            position: 'bottom-right',
            autoClose: 2000,
        });
    }

    // function to remove the item from the wishlist     
    function removeFromWishList(id) {
        setWishListItems((wishListItems) =>
            wishListItems.filter((item) => item.id !== id));
        toast("Removed from wishlist", {
            position: 'bottom-right',
            autoClose: 2000,
        });
    }

    // function to search the item from the search abr     
    function handleSearchTerm(event) {
        setSearchTerm(event.target.value)
    }

    const showSearchedProduct = (event) => {
        setSearchTerm(searchTerm)
        navigate("/product")
    }

   // function to sort the product according to price
   const handleSortingChange = (event) => {
    const sorting = event.target.value;
    setSorting(sorting);
  };

    return (
        <AppContext.Provider
            value={{
                // selectedCategory,
                // setSelectedCategory,
                addToCart,
                removeFromCart,
                cartItems,
                categories,
                products,
                addToWishList,
                removeFromWishList,
                wishListItems,
                handleSearchTerm,
                searchTerm,
                setSelectedCategories,
                clearCart,
                decreaseQuantity,
                increaseQuantity, isInCart,
                handleCategoryChange,
                selectedCategories,
                handleRating,
                ratingValue,
                clearFilters,
                sorting,
                userAddress,
                setUserAddress,
                userData,
                setUserData,
                setProducts,
                handleSortingChange,
                showSearchedProduct,
                showSidenav,
                toggleSideNav
            }}
        >
            {children}
        </AppContext.Provider>
    )
}