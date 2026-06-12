import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Productscard from '../components/Productscard';

const Allproducts = () => {
    const { products, searchQuery, setSearchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilteredProducts(products)
        }


    }, [filteredProducts, searchQuery,products])
    
    return (
        <div className='flex flex-col mt-16'>
            <div className='flex flex-col items-start mb-4'>
                <span className='text-primary font-semibold tracking-wider uppercase text-sm'>
                    Grocery Collection
                </span>
                <h2 className='text-3xl md:text-4xl font-bold mt-1'>
                       Fresh & Healthy Choices
                </h2>
                <p className='text-gray-500 text-sm md:text-base mt-2'>
                    Everything you need, from fresh produce to daily essentials.
                </p>
                <div className='w-24 h-1 bg-primary rounded-full mt-4'></div>
            </div>
            {/* <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-2 md:grid-cols-3
  lg:grid-cols-5 gap-4 mt-6"> */}

            <div className='grid grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6
              lg:grid-cols-5 mt-6'>
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                    <Productscard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Allproducts