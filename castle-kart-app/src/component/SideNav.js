import React, { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';


function SideNav() {
   
    const { handleSortingChange,
        categories,
        handleRating,
        clearFilters,
        ratingValue,
        handleCategoryChange,
        sorting,
        selectedCategories,
        toggleSideNav,
        showSidenav
        
    }
        = useContext(AppContext)

       
   
    
    return (
        <div className='icon-menu'><MenuIcon sx={{ fontSize:'40px'}}  onClick={toggleSideNav}/>
        <form className='sidenav' style={{display: showSidenav ? 'block' : 'none'}} >
        <div className='closebtn' ><MenuOpenIcon sx={{ fontSize:'larger'}}  onClick={toggleSideNav}/></div>
        <div className='side-filter-bar'>
            <div className='side-innerFilter' >
                <h2>Filters</h2>
                <hr />
                <div className='side-priceFilter'>
                    <h4>Sort by Price</h4>
                    <label>
                        <input type="radio" value="lowToHigh"
                            checked={sorting === 'lowToHigh'}
                            onChange={handleSortingChange}
                        /> Low To High
                          
                    </label>
                    <label>
                        <input type="radio"
                            value="highToLow"
                            checked={sorting === 'highToLow'}
                            onChange={handleSortingChange}
                        /> High To Low
                          
                    </label>
                </div>
                <hr />
                <div className='side-categoryFilter'>
                    <h4>Filter by category</h4>
                    {
                        categories.map(({ category, _id }) => (
                            <label key={_id}><input value={category}
                                type="checkbox"
                                name="category"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            /> {category.toUpperCase()}</label>
                        ))
                    }
                </div>
                <hr />
                <div className='side-ratingFilter'>
                    <h4>Sort by rating</h4>
                    <input type='range' min='0' max='5' step='0.2' value={ratingValue} onChange={(event) => handleRating(event)} />
                </div>
                <hr />
                <Button onClick={clearFilters} sx={{color: 'black'}}>Clear Filters</Button>
            </div>
        </div>
        </form>
        </div>
    )
}

export default SideNav
