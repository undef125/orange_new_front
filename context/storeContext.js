import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "@/app/api/customerAxiosInterceptor";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]);
  const [company, setCompany] = useState({});
  const [products, setproducts] = useState([]);
  const [colors, setcolors] = useState([]);

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
    deleteExpiredCartItems();
  }, [company]);

  const getCompanyDet = async (slug) => {
    try {
      const resp = await axios.get(`getcompanydetail/${slug}`);
      getProducts(resp.data._id);
      getColors(resp.data._id);
      setCompany(resp.data);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  const deleteExpiredCartItems = () => {
    if (cartItems.length > 0) {
      console.log(cartItems[0]?.expiryDate > new Date().getTime());
      let updatedCartItems = cartItems.filter(
        (item) => item.expiryDate > new Date().getTime()
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setcartItems(updatedCartItems);
    }
  };

  const addItemToCart = (item) => {
    item.expiryDate = new Date().getTime() + 1800000;
    const updatedCartItems = cartItems.length > 0 ? [...cartItems] : [];
    const existingItemIndex = updatedCartItems.findIndex(
      (prod) => prod._id === item._id
    );

    if (existingItemIndex !== -1) {
      let toUpdateItem = updatedCartItems[existingItemIndex];
      if (!updatedCartItems[existingItemIndex]?.sizes) {
        if (toUpdateItem.count < toUpdateItem.totalQuantity) {
          updatedCartItems[existingItemIndex].count += 1;
        }
      }
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
    console.log("updateMaAakoId: " + itemId)
    const udptedCartItem = cartItems.map((item) => {
      if (item._id === itemId) {
        if (todo === "+" && item.count < item.totalQuantity) {
          console.log(`plus: ${item._id}`)
          if (item?.sizes.length > 0) {
            if (item.size == undefined ) {
              item.size = item.sizes[0].size;
            }
            
            let { quantity } = item.sizes.filter(
              (sizeobj) => sizeobj.size === item.size
              )[0];
              if (item.count < quantity) {
                item.count += 1;
              }
            } else {
              item.count += 1;
            }
          } else if (todo === "-") {
          console.log(`minus: ${item._id}`)
          item.count === 0 ? "" : (item.count -= 1);
        }
      }
      item.expiryDate = new Date().getTime() + 1800000;
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(udptedCartItem));
    setcartItems(udptedCartItem);
  };
  const updateCartItemSizes = (itemId, tosize) => {
    const udptedCartItem = cartItems.map((item) => {
      if (item._id === itemId) {
        item.size = tosize;
        item.count = 1;
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
  const getColors = async (companyId) => {
    try {
      const resp = await axios.get(`getcolors/${companyId}`);
      setcolors(resp.data[0]);
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
        colors,
        getColors,
        updateCartItem,
        removeCartItem,
        updateCartItemSizes,
        deleteExpiredCartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
