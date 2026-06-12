import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative overflow-hidden rounded-3xl mt-6'>

      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className='hidden md:block w-full h-[650px] object-cover'
      />

      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className='md:hidden w-full h-[620px] object-cover'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent'></div>

      {/* Content */}
      <div className='absolute inset-0 flex items-center'>

        <div className='mx-4 sm:mx-[10%] w-full'>

          <div className='max-w-2xl text-white'>

            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/10 backdrop-blur-md border border-white/20 mb-6'>

              <span className='w-2 h-2 rounded-full bg-green-400'></span>

              <p className='text-sm font-medium tracking-wide'>
                100% Fresh Grocery Delivered
              </p>

            </div>

            {/* Heading */}
            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight'>
              Fresh Food,
              <br />
              Faster <span className='text-primary'>Delivery</span>
            </h1>

            {/* Description */}
            <p className='mt-6 text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl leading-7'>
              KitchenKart brings farm-fresh vegetables, fruits, dairy,
              snacks, and daily essentials right to your doorstep with
              fast delivery and unbeatable prices.
            </p>

            {/* Buttons */}
            <div className='flex flex-wrap items-center gap-4 mt-8'>

              <Link
                to={'/products'}
                className='group flex items-center gap-2 px-8 py-4 rounded-xl
                bg-primary hover:bg-primary-dull transition-all duration-300
                text-white font-semibold shadow-lg hover:scale-105'
              >
                Shop Now

                <img
                  src={assets.white_arrow_icon}
                  alt="arrow"
                  className='transition-transform duration-300
                  group-hover:translate-x-1'
                />
              </Link>

              <Link
                to={'/products'}
                className='group flex items-center gap-2 px-8 py-4 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                hover:bg-white/20 transition-all duration-300
                text-white font-semibold'
              >
                Explore Deals

                <img
                  src={assets.white_arrow_icon}
                  alt="arrow"
                  className='transition-transform duration-300
                  group-hover:translate-x-1'
                />
              </Link>

            </div>

            {/* Stats */}
            <div className='flex items-center gap-8 mt-10 flex-wrap'>

              <div>
                <h3 className='text-2xl font-bold'>10k+</h3>
                <p className='text-gray-300 text-sm'>Happy Customers</p>
              </div>

              <div>
                <h3 className='text-2xl font-bold'>500+</h3>
                <p className='text-gray-300 text-sm'>Fresh Products</p>
              </div>

              <div>
                <h3 className='text-2xl font-bold'>30 Min</h3>
                <p className='text-gray-300 text-sm'>Fast Delivery</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MainBanner