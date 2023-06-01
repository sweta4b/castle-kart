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
import { useAuth } from '../contexts/AuthContext';




function Header() {
  const { cartItems, wishListItems, handleSearchTerm,showSearchedProduct } = useContext(AppContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
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

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <Typography sx={{ alignSelf: 'left' }}>
            <NavLink to="/" style={{
              textDecoration: 'none',
              color: 'black',
              alignSelf: 'left',
              fontSize: '30px'
            }}> 
            <CastleIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '25px' }} /> <b> Castle</b> Kart</NavLink>
          </Typography>

          <div className='Search'>
            <div className='inputbase'>
              <input type="text" className='base' placeholder='Search' onChange={handleSearchTerm} />
              <IconButton size="large" aria-label="search" color="black" cursor='pointer' sx={{padding: ' 4px', position:'absolute'}} onClick={showSearchedProduct}>
            <SearchIcon />
          </IconButton>
            </div>
          </div>

          <div className='iconWrapper'>
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
              <span className='productNo'>{cartItems.length}
              </span>
            </IconButton>

            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteIcon sx={{ color: 'black', backgroundColor: 'none', fontSize: '30px' }} />
              <span className='productNo'>{wishListItems.length}</span>
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

        </Toolbar>
      </AppBar>
      {renderMenu}
      <ToastContainer />
    </>
  )
}

export default Header
