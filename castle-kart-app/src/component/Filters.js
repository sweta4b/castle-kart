
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

function Filters() {
    const { handleSortingChange,
        categories,
        handleRating,
        clearFilters,
        ratingValue,
        handleCategoryChange,
        sorting,
        selectedCategories
    }
        = useContext(AppContext)


    return (
        <>
        <div className='filter-bar'>
            <div className='innerFilter'>
                <h2>Filters</h2>
                <hr />
                <div className='priceFilter'>
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
                <div className='categoryFilter'>
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
                <div className='ratingFilter'>
                    <h4>Filter by rating</h4>
                    <input type='range' min='0' max='5' step='0.2' value={ratingValue} onChange={(event) => handleRating(event)} />
                </div>
                <hr />
                <Button onClick={clearFilters} sx={{ color: 'black' }}>Clear Filters</Button>
            </div>
        </div>
    </>
    )
}

export default Filters
