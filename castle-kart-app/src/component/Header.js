import React, { useContext, useState } from 'react'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CastleIcon from '@mui/icons-material/Castle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppContext } from '../contexts/AppContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { cartItems, wishListItems, handleSearchTerm,showSearchedProduct } = useContext(AppContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [pageMenu, setPageMenu] = useState(null);
  const isPageMenuOpen = Boolean(pageMenu);
  const { token, signOut } = useAuth();


  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function logout() {
    await signOut();
    navigate("/login");
  }

  function handlePageMenu(e) {

    setPageMenu(e.currentTarget);
  }
  function handlePageMenuClose() {
    setPageMenu(null);
  }

  const renderPage = (
    <Menu
    anchorEl={pageMenu}
    id="user-profile-menu"
    keepMounted
    transformOrigin={{
      horizontal: "right",
      vertical: "top",
    }}
    anchorOrigin={{
      horizontal: "right",
      vertical: "bottom",
    }}
    open={isPageMenuOpen}
    onClose={handlePageMenuClose}
  >

    <MenuItem onClick={() => navigate("/cart")}>Cart</MenuItem>
    <MenuItem onClick={() => navigate("/wishlist")}>Wishtlist</MenuItem>
    <MenuItem onClick={() => navigate("/adress")}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
  </Menu>
);
  

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={() => navigate("/adress")}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position='sticky' sx={{
        py: 2, backgroundColor: 'azure'
      }}>
          
        <Toolbar className=' md:max-w-[1480px] max-w-[600px]  m-auto w-full h-full flex flex-wrap justify-between items-center md:px-0 px-8'>

          <Typography  >
            <NavLink to="/" style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '30px'
            }}> 
            <CastleIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '25px' }} /> <b> Castle</b> Kart</NavLink>
          </Typography>

          <div className='w-full md:w-[50%] bg-gray-200 '>
            <div className=' w-full flex'>
            <IconButton size="large" aria-label="search" color="black" cursor='pointer' onClick={showSearchedProduct}>
            <SearchIcon />
          </IconButton>
              <input type="text" className='bg-gray-100 w-full p-2 rounded' placeholder='Search' onChange={handleSearchTerm} />
              
            </div>
          </div>

          <div className=' flex flex-wrap items-center absolute md:relative right-10 top-0'>
            <div className='max-md:hidden md:block'>
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
              <span className='productNo'>{cartItems.length === 0 ? '' : cartItems.length}
              </span>
            </IconButton>

            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
              <span className='productNo'>{wishListItems.length === 0 ? '' : wishListItems.length}</span>
            </IconButton>

            {token ? (
              <IconButton onClick={handleProfileMenuOpen}>
                <AccountCircleIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
              </IconButton>

            ) : <IconButton onClick={() => navigate("/login")}>
              <LoginIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
            </IconButton>

            }
            </div>
           
            <div className='md:hidden'>
              <IconButton onClick={handlePageMenu}>
                  <MenuIcon sx={{color: 'black'}}/>
              </IconButton>
            </div>
          </div>

        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderPage}
      <ToastContainer />
    </>
  )
}

export default Header





