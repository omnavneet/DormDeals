import React from 'react'

const FilterPrice = () => {
    return (
        <div>
            <label className="mt-8">Filter By Price</label>
            <div className="flex mb-5 gap-4">

                <input
                    type="number" name="minPrice" placeholder="Min Price" className="rounded-lg text-lg" />
                <input
                    type="number" name="maxPrice" placeholder="Max Price" className="rounded-lg text-lg" />
            </div>
        </div>
    )
}

export default FilterPrice