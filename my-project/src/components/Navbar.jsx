import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Vegan } from 'lucide-react';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getcartcount,axios } = useAppContext();


  const logout = async () => {
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
           setUser(null);
           navigate('/');
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
   

  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('/products')
    }
  }, [searchQuery])

  return (
    <nav className="bg-white border-b border-gray-300 transition-all">
      {/* Top navbar */}
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 relative">
        <NavLink to="/" className="flex items-center justify-center gap-1">
        <Vegan className='text-primary size-11' /> 
         <h2 className='h-10 w-auto text-4xl font-bold'>Kitchen<span className='text-primary'>Kart</span></h2>

        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative font-medium pb-1 transition ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              `relative font-medium pb-1 transition ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                All products
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </>
            )}
          </NavLink>


          <NavLink
            to="/contact"
            end
            className={({ isActive }) =>
              `relative font-medium pb-1 transition ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Contact
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </>
            )}
          </NavLink>


          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search icon" className="h-4 w-4" />
          </div>

          <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="cart icon" className="w-6 opacity-80" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getcartcount()}</button>
          </div>
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="profile" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-grey-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li onClick={() => navigate('/my-orders')} className="p-1.5 pl-3 hover:bg-primary/50 cursor-pointer">
                  My Orders
                </li>
                <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/50 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* show cart icon in small screen */}
        <div className='flex items-center gap-6 sm:hidden'>
          <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="cart icon" className="w-6 opacity-80" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getcartcount()}</button>
          </div>
          {/* Hamburger Button */}
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img src={assets.menu_icon} alt="Menu" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (push content down) */}
      {open && (
        <div className="flex flex-col items-start gap-2 px-6 py-4 md:hidden text-sm border-t border-gray-200 bg-white">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full py-1 ${isActive ? "text-primary font-medium" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full py-1 ${isActive ? "text-primary font-medium" : "text-gray-700"
              }`
            }
          >
            All products
          </NavLink>
          {user ? (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}  className={({ isActive }) =>
              `block w-full py-1 ${isActive ? "text-primary font-medium" : "text-gray-700"
              }`
            }>
              My Orders
            </NavLink>
          ) : (
            <NavLink to="/contact" onClick={() => setOpen(false)}  className={({ isActive }) =>
              `block w-full py-1 ${isActive ? "text-primary font-medium" : "text-gray-700"
              }`
            }>
              Contact
            </NavLink>
          )}

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

