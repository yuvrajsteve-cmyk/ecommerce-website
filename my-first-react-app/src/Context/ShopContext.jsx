import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// ਕਾਰਟ ਨੂੰ ਖਾਲੀ ਸੈੱਟ ਕਰਨ ਲਈ ਫੰਕਸ਼ਨ
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]); 
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // 1. ਬੈਕਐਂਡ ਤੋਂ ਸਾਰੇ ਪ੍ਰੋਡਕਟਸ ਲੈ ਕੇ ਆਉਣਾ
        // ithe link change kita hoya aa http://localhost:4000/allproducts
        fetch('https://ecommerce-website-31e9.onrender.com/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.log("Error fetching products:", error));

        // 2. ਜੇ ਯੂਜ਼ਰ ਲੌਗਇਨ ਹੈ, ਤਾਂ ਉਹਦਾ ਸੇਵ ਕੀਤਾ ਹੋਇਆ ਕਾਰਟ ਡਾਟਾ ਲੈ ਕੇ ਆਉਣਾ
        // ithe link change kita hoya aa http://localhost:4000/getcart
        if (localStorage.getItem('auth-token')) {
            fetch('https://ecommerce-website-31e9.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data));
        }
    }, [])

    const addToCart = (itemId) => {
        // ਫਰੰਟਐਂਡ ਸਟੇਟ ਅਪਡੇਟ ਕਰੋ
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        
        // ਜੇ ਲੌਗਇਨ ਹੈ ਤਾਂ ਬੈਕਐਂਡ (DB) ਵਿੱਚ ਵੀ ਅਪਡੇਟ ਕਰੋ
        // ithe link change kita hoya aa http://localhost:4000/addtocart
        if (localStorage.getItem('auth-token')) {
            fetch('https://ecommerce-website-31e9.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log("Added to DB:", data));
        }
    };

    const removeFromCart = (itemId) => {
        // ਫਰੰਟਐਂਡ ਸਟੇਟ ਅਪਡੇਟ ਕਰੋ
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        // ਜੇ ਲੌਗਇਨ ਹੈ ਤਾਂ ਬੈਕਐਂਡ (DB) ਵਿੱਚ ਵੀ ਅਪਡੇਟ ਕਰੋ
        // ithe link change kitaa hoya aa http://localhost:4000/removefromcart
        if (localStorage.getItem('auth-token')) {
            fetch('https://ecommerce-website-31e9.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log("Removed from DB:", data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (all_product.length > 0) {
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = all_product.find((product) => product.id === Number(item));
                    if (itemInfo) {
                        totalAmount += itemInfo.new_price * cartItems[item];
                    }
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = { 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        getTotalCartItems 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;