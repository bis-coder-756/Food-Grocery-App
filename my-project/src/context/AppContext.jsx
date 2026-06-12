import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;


    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    const [sellerLoading, setSellerLoading] = useState(true)

    // FETCH SELLER LOGIN STATUS TRUE/FALSE
    const fetchSeller = async () => {
        try {

            const { data } = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        } finally {
            setSellerLoading(false) // VERY IMPORTANT
        }
    }

    // FETCH USER AUTH (LOGIN) STATUS ,USER DATA AND CART ITEMS
    const fetchUserStatus = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');

            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            } else {
                setUser(null)
            }

        } catch (error) {
            setUser(null)
        }
    };




    // FETCH PRODUCT DATA //
    const fetchproductdata = async () => {
        // setProducts(dummyProducts)
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
       
    const addtocart = (itemId) => {

    // ❌ If user not logged in
    if (!user) {
        toast.error("Please login first");
        setShowUserLogin(true); // optional (open login modal)
        return;
    }

    // ✅ If logged in
    let cartdata = structuredClone(cartItems);

    if (cartdata[itemId]) {
        cartdata[itemId] += 1;
    } else {
        cartdata[itemId] = 1;
    }

    setCartItems(cartdata);
    toast.success('Added to Cart');
};
    //  UPDATE CART ITEM QUANTITY  ///
    const updatecartitem = (itemId, quantity) => {
        let cartdata = structuredClone(cartItems)
        cartdata[itemId] = quantity;
        setCartItems(cartdata)
        toast.success('cart updated')
    }
    //  REMOVE FROM CART   ///
    const removefromcart = (itemId) => {
        let cartdata = structuredClone(cartItems);
        if (cartdata[itemId]) {
            cartdata[itemId] -= 1

            if (cartdata[itemId] === 0) {
                delete cartdata[itemId]
            }
        }
        toast.success('remove from cert')
        setCartItems(cartdata)
    }


    // GET CART ITEM COUNT //
    const getcartcount = () => {
        let totalcount = 0;
        for (const item in cartItems) {
            totalcount += cartItems[item]
        }
        return totalcount;
    }

    // GET CART TOTAL AMOUNT //
    const getcartamount = () => {
        let totalamount = 0;
        for (const itemId in cartItems) {
            let iteminfo = products.find((product) => product._id === itemId);
            if (iteminfo && cartItems[itemId] > 0) {
                totalamount += (iteminfo.offerPrice || 0) * cartItems[itemId];
            }
        }
        return Math.floor(totalamount * 100) / 100;
    };

    console.log('cart amount is', getcartamount())



    useEffect(() => {
        fetchproductdata()
        fetchSeller()
        fetchUserStatus()

    }, [])

    
    // UPDATE DATABASE CART ITEMS
  
    const isFirstRender = useRef(true)

useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false
        return
    }

    const updateCart = async () => {
        try {
            const { data } = await axios.post('/api/cart/update', { cartItems })
            if (!data.success) {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    if(user){
        updateCart()
    }

}, [cartItems])


    const value = {
        user, setUser, isSeller, setIsSeller, navigate,
        showUserLogin, setShowUserLogin, products, currency, addtocart, updatecartitem,
        removefromcart, cartItems, setSearchQuery, searchQuery, getcartcount, getcartamount, axios, sellerLoading, setSellerLoading, fetchproductdata,setCartItems
    };
    console.log("cartItems-appcontext", showUserLogin)
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}