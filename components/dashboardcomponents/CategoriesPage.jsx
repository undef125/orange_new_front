import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import SearchIcon from "@rsuite/icons/Search";
import {  toast } from "react-hot-toast";
import { Input, InputGroup, Button } from "rsuite";
import AddCategories from "./categoriespage/AddCategories";
import axios from "@/app/api/axiosinterceptor";
import toBase64 from "@/utilis/FileToBase64";
import { InfinitySpin, Oval } from "react-loader-spinner";
import { MdDeleteForever } from "react-icons/md";
const styles = {
  width: 300,
  marginBottom: 10,
};

const CategoriesPage = ({ company }) => {

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [name, setname] = useState(false);
  const [image, setimage] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);
  const [loadingCat, setloadingCat] = useState(false);
  const [currentCatIndex, setcurrentCatIndex] = useState(-1);
  const [updateValues, setupdateValues] = useState({});
  const [categories, setcategories] = useState([]);
  const [backupCats, setbackupCats] = useState([]);

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getCategories = async () => {
    setloadingCat(true);
    try {
      let response = await axios.get(`getcategories/${company?._id}`);
      setcategories(response.data);
      setbackupCats(response.data);
      setupdateLoading(false);
      setloadingCat(false);
    } catch (error) {
      setloadingCat(false);
      console.log(`error: ${error}`);
    }
  };

  const updateCategory = async (catId) => {
    const toastId = toast.loading("updating...")
    setupdateLoading(true);
    try {
      await axios.put(`/updatecategory/${catId}`, updateValues);
      getCategories(toastId);
      setname(false);
      setimage(false);
      toast.dismiss(toastId)
      toast.success("Successfully Updated the Category");
    } catch (error) {
      setupdateLoading(false);
      toast.error("Error Updating the Category");
    }
  };

  const deleteCategory = async (catId) => {
    const toastId = toast.loading("deleting...")
    try {
      await axios.delete(`/deletecategory/${catId}`);
      getCategories();
      toast.success("Successfully Deleted the Category", {
        autoClose: 2000,
      });
      toast.dismiss(toastId)
      toast.success("Successfully Deleted the Category");
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(" Deletion failed");
    }
  };

  useEffect(() => {
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, [company]);

  return (
    <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
      <div className="w-[80%] flex flex-col items-center mt-[1rem]">
        <div>
          <h1 className="text-[1.5rem] md:text-[2.5rem] text-orange-500 ">
            Manage Your Categories
          </h1>
        </div>
        <div>
          <InputGroup inside style={styles}>
            <Input
              onChange={(searchText) => {
                if (searchText.trim("") === "") {
  
                  setcategories(backupCats);
                } else {
                  const filteredArray = backupCats?.filter((category) =>
                    category.categoryName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setcategories(filteredArray);
                }
              }}
            />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
          <Button onClick={() => handleOpen("50rem")}>
            <code>Add Category</code>
          </Button>
        </div>
        <div className="flex flex-wrap gap-8 w-[100%] px-4 mt-[2rem]">
          {loadingCat ? (
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          ) : (
            categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className=" transition-all duration-500 ease-in-out bg-white cursor-pointer group flex flex-col min-h-[20rem] w-[18rem] rounded hover:shadow-md hover:shadow-slate-500 border-[1px] border-slate-300"
                >
                  <div className=" flex flex-col rounded   relative">
                    <div className=" flex justify-center  group/image">
                      <Image
                        src={
                          image && currentCatIndex === index
                            ? `${
                                updateValues.categoryImage === undefined
                                  ? ""
                                  : updateValues.categoryImage
                              }`
                            : `${category.categoryImage}`
                        }
                        height="1600"
                        width="1574"
                        alt="category related image "
                        className="p-4 w-[10rem] h-[10rem] object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute hidden group-hover/image:flex justify-center items-center h-[10rem] w-[100%] bg-[#f8f8f8d6] ">
                        <TbEdit
                          className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                          onClick={() => {
                            setcurrentCatIndex(index);
                            setimage(true);
                          }}
                        />
                      </div>
                    </div>
                    {image && currentCatIndex === index ? (
                      <>
                        <input
                          type="file"
                          onChange={async (e) => {
                            setupdateValues({
                              ...updateValues,
                              categoryImage: await toBase64(e.target.files[0]),
                            });
                          }}
                        />
                      </>
                    ) : null}
                  </div>
                  <hr />
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
                    <div className="flex w-[80%] m-auto justify-between">
                      <TbEdit
                        className="text-[1.8rem] hover:text-orange-500 cursor-pointer "
                        onClick={() => {
                          setcurrentCatIndex(index);
                          setname(true);
                        }}
                      />
                      <MdDeleteForever
                        className="text-[1.8rem] text-red-500 hover:text-orange-500 cursor-pointer "
                        onClick={() => {
                          deleteCategory(category._id);
                        }}
                      />
                    </div>
                  </div>
                  {updateLoading ? (
                    <>
                      <div className="px-6 py-2 text-[1.1rem] bg-orange-500 rounded-xl w-[70%] mb-2 m-auto flex gap-4 ">
                        <p>Updating</p>

                        <Oval
                          visible={true}
                          height="30"
                          width="30"
                          color="#4fa94d"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    </>
                  ) : (name || image) && currentCatIndex === index ? (
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
                          setimage(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}

          {}
        </div>
      </div>
      <AddCategories
        handleClose={handleClose}
        size={size}
        open={open}
        company={company}
        setOpen={setOpen}
        getCategories={getCategories}
      />
    </div>
  );
};

export default CategoriesPage;
