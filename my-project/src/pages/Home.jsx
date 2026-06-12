import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import Testimonial from '../components/Testimonial'
import WhyChooseUs from '../components/WhyChooseUs'




const Home = () => {
  return (
    <div className='mt-10'>
   
      <MainBanner/>
      <Categories/>
      <Bestseller/>
      <WhyChooseUs/>
      <Testimonial/>
  
    </div>
  )
}

export default Home
