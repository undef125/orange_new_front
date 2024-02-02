import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup, Button } from "rsuite";
import AddCategories from "./categoriespage/AddCategories";
import axios from "@/app/api/axiosinterceptor";
import UpdateCategories from "./categoriespage/UpdateCategories";
import toBase64 from "@/utilis/FileToBase64";

const styles = {
  width: 300,
  marginBottom: 10,
};

const CategoriesPage = ({ company }) => {
  //for add category (moddal)
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [name, setname] = useState(false);
  const [image, setimage] = useState(false);
  const [currentCatIndex, setcurrentCatIndex] = useState(-1);
  const [updateValues, setupdateValues] = useState({});

  const [categories, setcategories] = useState([]);
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getCategories = async () => {
    try {
      let response = await axios.get(`getcompanycategories/${company?._id}`);
      setcategories(response.data);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  const updateCategory = async (catId) => {
    try {
      const response = await axios.put(
        `/updatecategory/${catId}`,
        updateValues
      );
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, [company]);

  return (
    <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
      <div className="w-[80%] flex flex-col items-center mt-[1rem]">
        <div>
          <h1 className="text-[2.5rem] text-orange-500 ">
            Manage Your Categories
          </h1>
        </div>
        <div>
          <InputGroup inside style={styles}>
            <Input />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
          <Button onClick={() => handleOpen("50rem")}>
            <code>Add Category</code>
          </Button>
        </div>
        <div className="flex gap-8 w-[100%] px-4 mt-[2rem]">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className=" transition-all duration-500 ease-in-out bg-white cursor-pointer group flex flex-col min-h-[20rem] w-[18rem] rounded hover:shadow-md hover:shadow-slate-500 border-[1px] border-slate-300"
              >
                <div className=" p-4 flex flex-col rounded  ">
                  <div className=" flex justify-between  "> 

                  <Image
                    src={image? `${updateValues.categoryImage}` :`https://ecommerce-backend-eight.vercel.app/${category.categoryImage}`}
                    height="1600"
                    width="1574"
                    alt="category related image"
                    className="w-[10rem] h-[10rem] object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                  />
                  <TbEdit
                    className="text-[1.6rem] hover:text-orange-500 cursor-pointer "
                    onClick={() => {
                      setcurrentCatIndex(index);
                      setimage(true);
                    }}
                  />
                  {console.log(updateValues)}
                  </div>
                  {image ? (
                    <input
                      type="file"
                      onChange={async (e) => {
                        setupdateValues({
                          ...updateValues,
                          categoryImage: await toBase64(e.target.files[0]),
                        });
                      }}
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                  <div className="flex justify-between items-center ">
                    <input
                      type="text"
                      className={`font-semibold text-[1.2rem] placeholder-black w-auto outline-0 ${
                        name && currentCatIndex === index
                          ? "border-b-2 border-black"
                          : ""
                      }`}
                      value={
                        name && currentCatIndex === index
                          ? updateValues.categoryName
                          : category.categoryName
                      }
                      readOnly={!name}
                      onChange={(e) => {
                        setupdateValues({
                          ...updateValues,
                          categoryName: e.target.value,
                        });
                      }}
                    />

                    <TbEdit
                      className="text-[1.6rem] hover:text-orange-500 cursor-pointer "
                      onClick={() => {
                        setcurrentCatIndex(index);
                        setname(true);
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center ">
                    <input
                      type="text"
                      className={`font-semibold text-[1.2rem] placeholder-gray-500 outline-0 ${
                        name && currentCatIndex === index
                          ? "border-b-2 border-black"
                          : ""
                      }`}
                      value={
                        name && currentCatIndex === index
                          ? updateValues.categoryDescription
                          : category.categoryDescription
                      }
                      readOnly={!name}
                      onChange={(e) => {
                        setupdateValues({
                          ...updateValues,
                          categoryDescription: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {(name || image) && currentCatIndex === index ? (
                  <div className="flex flex-col">
                    <button
                      className="px-6 py-2 text-[1.1rem] bg-orange-500 rounded-xl w-[70%] mb-2 m-auto "
                      onClick={() => {
                        updateCategory(category._id);
                      }}
                    >
                      Update Value
                    </button>
                    <button
                      className="px-6 py-2 text-[1.1rem] bg-orange-500 rounded-xl w-[70%] mb-2 m-auto "
                      onClick={() => {
                        setname(false);
                        setimage(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <AddCategories
        handleClose={handleClose}
        size={size}
        open={open}
        company={company}
      />
    </div>
  );
};

export default CategoriesPage;
