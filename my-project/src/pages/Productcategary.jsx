import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import Productscard from '../components/Productscard';

const Productcategary = () => {
    const{products}=useAppContext();
    const{ category}=useParams();
    const searchcetagary=categories.find((item)=>item.path.toLowerCase()===
    category)
    const filteredProducts=products.filter((product)=>product.category.toLowerCase()===
  category)

  return (
    <div className='mt-16'>
      {searchcetagary && (
        <div className='flex flex-col w-max items-end'>
          <p className='text-2xl font-medium'>{searchcetagary.text.toUpperCase()}</p>
           <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}
      {filteredProducts.length > 0 ?(
   <div  className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6
      lg:grid-cols-5 mt-6'>
    {filteredProducts.map((product)=>(
      <Productscard key={product._id} product={product}/>
    ))}
   </div>
      ):(
    <div className='flex items-center justify-center h-[60vh]'>
      <p className='text-3xl font-medium text-primary'>No Product found in this category</p>
    </div>
      )}
    </div>
  )
}
export default Productcategary
