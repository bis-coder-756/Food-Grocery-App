import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 md:mt-20">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Catego<span className="text-primary">ries</span>
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Explore our wide range of categories and discover products tailored to your needs.
      </p>

      <div className="flex flex-wrap items-center justify-center mt-12 gap-5 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="cursor-pointer"
          >
            {/* Card */}
            <div
              className="relative group rounded-lg overflow-hidden"
              style={{ backgroundColor: category.bgColor }}
            >
              <img
                src={category.image}
                alt={category.text}
                className="size-56 object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay ONLY for md+ */}
              <div className="absolute inset-0 hidden md:flex flex-col justify-end p-4 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h1 className="text-lg font-medium">
                  {category.text}
                </h1>

                <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                  Explore now
                </p>
              </div>
            </div>

            {/* Mobile Label (always visible on small screens) */}
            <p className="md:hidden text-center mt-2 text-sm font-medium text-slate-700">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;