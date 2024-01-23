import React, { useState, createContext } from "react";
import { getCookie } from "cookies-next";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";

export const IndexContext = createContext();

const IndexProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState();
  const [signup2Data, setSignup2Data] = useState();
  const [informationData, setInformationData] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [user, setUser] = useState({});

  const [company, setCompany] = useState({
    description: "",
    socialMedias: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      tiktok: "",
      website: "",
    },
    address: "",
    email: "",
    phone: "",
    postalcode: "",
  });

  // for login user
  const getUserDetails = async () => {
    const accesstoken = getCookie("accesstoken");
    if (accesstoken) {
      // const data = jwtDecode(accesstoken);
      setUser(data);
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <IndexContext.Provider
      value={{
        loading,
        setLoading,
        signupData,
        signup2Data,
        setSignupData,
        setSignup2Data,
        informationData,
        setInformationData,
        products,
        setProducts,
        user,
        getUserDetails,
        filteredProducts,
        setFilteredProducts,
        productCat,
        setProductCat,
        company,
        setCompany,
      }}
    >
      {props.children}
    </IndexContext.Provider>
  );
};

export default IndexProvider;
