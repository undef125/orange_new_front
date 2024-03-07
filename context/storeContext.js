import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "@/app/api/customerAxiosInterceptor";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]);
  const [company, setCompany] = useState({});
  const [products, setproducts] = useState([]);

  const getCartItems = () => {
    try {
      const productsInCart =
        JSON.parse(localStorage.getItem("cart")) === null
          ? []
          : JSON.parse(localStorage.getItem("cart"));
      const filteredProducts = productsInCart.filter(
        (product) => product.companyId === company?._id
      );
      return filteredProducts;
    } catch (error) {
      console.log(`error getting items for card: ${error}`);
    }
  };

  useEffect(() => {
    //setting cartItems here
    setcartItems(getCartItems());
  }, [company]);

  const getCompanyDet = async (slug) => {
    try {
      const resp = await axios.get(`getcompanydetail/${slug}`);
      getProducts(resp.data._id);
      setCompany(resp.data);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  const addItemToCart = (item) => {
    const updatedCartItems = cartItems.length > 0 ? [...cartItems] : [];

    const existingItemIndex = updatedCartItems.findIndex(
      (prod) => prod._id === item._id
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].count += 1;
    } else {
      item.count = 1;
      updatedCartItems.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setcartItems(updatedCartItems);
  };

  const removeCartItem = (itemId) => {
    let indexOfItemToRemove;
    cartItems.forEach((item, index) => {
      if (item._id === itemId) indexOfItemToRemove = index;
    });
    const updatedCartItems = cartItems.toSpliced(indexOfItemToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setcartItems(updatedCartItems);
  };

  const updateCartItem = (itemId, todo) => {
    const udptedCartItem = cartItems.map((item) => {
      if (item._id === itemId) {
        if(todo === "+") {
          item.count += 1
        } else if(todo === "-") {
         item.count === 0 ? '' : item.count -= 1
        }
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(udptedCartItem));
    setcartItems(udptedCartItem);
  };
  const updateCartItemSizes = (itemId, tosize) => {
    const udptedCartItem = cartItems.map((item) => {
      if (item._id === itemId) {
        item.size = tosize
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(udptedCartItem));
    setcartItems(udptedCartItem);
  };

  const getProducts = async (companyId) => {
    try {
      const resp = await axios.get(`getproducts/${companyId}`);
      setproducts(resp.data);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        getCompanyDet,
        addItemToCart,
        cartItems,
        company,
        setcartItems,
        getProducts,
        products,
        updateCartItem,
        removeCartItem,
        updateCartItemSizes,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
