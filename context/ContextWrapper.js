import React, { useContext, useEffect } from "react";
import { IndexContext } from "./index";
import axios from "../pages/api/axiosinterceptor";
import cookieCutter from "cookie-cutter";

const Wrapper = ({ children }) => {
  const {
    setSignupData,
    setSignup2Data,
    setProducts,
    setLoading,
    setProductCat,
    setFilteredProducts,
  } = useContext(IndexContext);

  return <div>{children}</div>;
};

export default Wrapper;
