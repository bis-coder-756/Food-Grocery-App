import { useState } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Productscard = ({ product }) => {

    const { currency, addtocart, cartItems, removefromcart, navigate } = useAppContext();

    // get rating
    const getRating = (id) => {
        const ratings = [4, 4.5, 5];

        // create a stable index from product id
        const index = parseInt(id?.slice(-2), 16) % ratings.length;

        return ratings[index];
    };
    const rating = getRating(product._id);
    return product && (

        <div
  onClick={() => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0, 0);
  }}
  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
>
  {/* Image Section */}
  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 h-52 flex items-center justify-center overflow-hidden">

    {/* Discount Badge */}
    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
      Save {Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
    </span>

    <img
      src={product.image[0]}
      alt={product.name}
      className="w-36 group-hover:scale-110 transition duration-500"
    />
  </div>

  {/* Content */}
  <div className="p-4">

    {/* Category */}
    <p className="text-xs font-medium uppercase tracking-wider text-primary">
      {product.category}
    </p>

    {/* Product Name */}
    <h3 className="text-gray-800 font-semibold text-lg mt-1 line-clamp-2 min-h-[56px]">
      {product.name}
    </h3>

    {/* Rating */}
    <div className="flex items-center gap-1 mt-2">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <img
            key={i}
            src={
              i < Math.floor(rating)
                ? assets.star_icon
                : assets.star_dull_icon
            }
            className="w-4"
            alt=""
          />
        ))}

      <span className="ml-1 text-sm font-medium text-gray-600">
        {rating}
      </span>
    </div>

    {/* Price */}
    <div className="flex items-center gap-2 mt-4">
      <span className="bg-primary/10 text-primary font-bold text-xl px-3 py-1 rounded-full">
        {currency}
        {product.offerPrice}
      </span>

      <span className="text-gray-400 line-through text-sm">
        {currency}
        {product.price}
      </span>
    </div>

    {/* Cart Section */}
    <div
      className="mt-4"
      onClick={(e) => e.stopPropagation()}
    >
      {!cartItems[product._id] ? (
        <button
          onClick={() => addtocart(product._id)}
          className="w-full h-11 bg-primary text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          <img
            src={assets.cart_icon}
            alt=""
            className="w-4 brightness-0 invert"
          />
          Add to Cart
        </button>
      ) : (
        <div className="h-11 flex items-center justify-between bg-primary/10 rounded-2xl px-2">
          <button
            onClick={() => removefromcart(product._id)}
            className="w-8 h-8 rounded-full bg-white shadow text-lg"
          >
            -
          </button>

          <span className="font-semibold text-primary">
            {cartItems[product._id]}
          </span>

          <button
            onClick={() => addtocart(product._id)}
            className="w-8 h-8 rounded-full bg-primary text-white shadow"
          >
            +
          </button>
        </div>
      )}
    </div>
  </div>
</div>
    );
};

export default Productscard


