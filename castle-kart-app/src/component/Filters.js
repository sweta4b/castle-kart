
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
        <div className=' h-[100vh] mt-20 rounded p-4 shadow-xl hidden md:block  border-2 '>
            <div className='innerFilter'>
                <h2 className='border-b text-xl font-bold'>Filters</h2>
                <div className='priceFilter'>
                    <h4 className='border-b text-lg font-bold'>Sort by Price</h4>
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
                
                <div className='categoryFilter'>
                    <h4 className='border-b text-lg font-bold'>Filter by category</h4>
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
                
                <div className='ratingFilter'>
                    <h4 className='border-b text-lg font-bold'>Filter by rating</h4>
                    <input type='range' min='0' max='5' step='0.2' value={ratingValue} onChange={(event) => handleRating(event)} />
                </div>
                
                <Button onClick={clearFilters} sx={{ color: 'black' }}>Clear Filters</Button>
            </div>
        </div>
    </>
    )
}

export default Filters
