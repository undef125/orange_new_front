import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import SearchIcon from "@rsuite/icons/Search";
import { toast } from "react-hot-toast";
import { Input, InputGroup, Button } from "rsuite";
import AddProducts from "./productspage/AddProducts";
import axios from "@/app/api/axiosinterceptor";
import toBase64 from "@/utilis/FileToBase64";
import { InfinitySpin, Oval } from "react-loader-spinner";
import { MdDeleteForever } from "react-icons/md";
import ListingProducts from "./productspage/ListingProducts";
const styles = {
  width: 300,
  marginBottom: 10,
};

const ProductsPage = ({ company }) => {
  const [loadingCat, setloadingCat] = useState(false);
  const [products, setproducts] = useState([]);
  const [backupProds, setbackupProds] = useState([]);

  const [catNames, setcatNames] = useState([]);

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getCategoriesNameList = async () => {
    try {
      let response = await axios.get(`getcategories/${company?._id}`);
      let managedArrayForSelect = response?.data?.map((item) => ({
        label: item.categoryName,
        value: item._id,
      }));
      setcatNames(managedArrayForSelect);
    } catch (error) {
      setloadingCat(false);
      console.log(`error: ${error}`);
    }
  };
  const getProducts = async () => {
    setloadingCat(true);
    try {
      let response = await axios.get(`getproducts/${company?._id}`);
      setproducts(response.data);
      setbackupProds(response.data);
      setloadingCat(false);
    } catch (error) {
      setloadingCat(false);
      console.log(`error: ${error}`);
    }
  };
  useEffect(() => {}, [products]);

  useEffect(() => {
    getCategoriesNameList();
    getProducts();
  }, [company]);

  return (
    <>
      {
        <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
          <div className="w-[95%] md:w-[80%] flex flex-col items-center mt-[1rem]">
            <div>
              <h1 className="text-[1.5rem] md:text-[2.5rem] text-orange-500 ">
                Manage Your Products
              </h1>
            </div>
            <div className="flex gap-10">
              <InputGroup inside style={styles} className="h-[2.4rem]">
                <Input
                  
                  onChange={(searchText) => {
                    if (searchText.trim("") === "") {
                      setproducts(backupProds);
                    } else {
                      const filteredArray = backupProds?.filter((product) =>
                        product.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      );
                      setproducts(filteredArray);
                    }
                  }}
                />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
              <Button onClick={() => handleOpen("50rem")} className="h-[2.4rem]">
                <code>Add Product</code>
              </Button>
            </div>
            <div className="flex gap-8 w-[100%] px-4 mt-[2rem]">
              {loadingCat ? (
                <InfinitySpin
                  visible={true}
                  width="200"
                  color="#4fa94d"
                  ariaLabel="infinity-spin-loading"
                />
              ) : (
                <ListingProducts
                  products={products}
                  catNames={catNames}
                  getProducts={getProducts}
                />
              )}

              {}
            </div>
          </div>
          <AddProducts
            handleClose={handleClose}
            size={size}
            open={open}
            company={company}
            setOpen={setOpen}
            catNames={catNames}
            getProducts={getProducts}
          />
        </div>
      }
    </>
  );
};

export default ProductsPage;
