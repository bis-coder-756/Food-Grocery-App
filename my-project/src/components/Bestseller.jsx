import React from 'react'
import Productscard from './Productscard'
import { useAppContext } from '../context/AppContext'

const Bestseller = () => {
  const { products } = useAppContext();

  return (
    <div className='mt-24'>
     {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
          Best <span className='text-primary'>Sellers</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Top-rated products available right now
        </p>
      </div>
      {/* // NOW SHOW ALL BEST SELLER PRODUCTS BY FILTER AND MAP METHOD // */}
      <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] sm:grid-cols-2 md:grid-cols-3
  lg:grid-cols-5 gap-4 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <Productscard key={index} product={product} />
          ))}

      </div>
    </div>
  )
}
export default Bestseller
