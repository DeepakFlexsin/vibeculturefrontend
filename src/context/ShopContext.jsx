import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹ ';
    const delivery_fee = 0;
    const free_delivery_threshold = 299;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const [userAddress, setUserAddress] = useState(null)
    const [email, setEmail] = useState(null)
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        // Check if item is a variant index or size
                        let price = itemInfo.price;
                        if (itemInfo.variants && itemInfo.variants[item]) {
                            price = itemInfo.variants[item].price;
                        }
                        totalAmount += price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getDeliveryFee = async (cartAmount) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/getdeliverycharges', { cartAmount }, { headers: { token } })
            if (response.data.success) {
                return response.data.deliveryCharge;
            }
            return delivery_fee;
        } catch (error) {
            console.log(error);
            return delivery_fee;
        }
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) setCartItems(response.data.cartData)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserAddress = async (token) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (data.success && data.user.address) setUserAddress(data.user.address)
            if (data.success && data.user.email) setEmail(data.user.email)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const t = localStorage.getItem('token')
            setToken(t)
            getUserCart(t)
            getUserAddress(t)
        }
        if (token) {
            getUserCart(token)
            getUserAddress(token)
        }
    }, [token])

    const value = {
        products, currency, delivery_fee, free_delivery_threshold,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, getDeliveryFee, navigate, backendUrl,
        setToken, token, userAddress, setUserAddress, email, setEmail
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;