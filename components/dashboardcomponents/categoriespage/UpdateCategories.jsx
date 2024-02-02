import React, { useEffect, useLayoutEffect, useState } from "react";
import { categoriesValidationSchema } from "@/utilis/FormValidationSchema";
import { Modal } from "rsuite";
import { useFormik } from "formik";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";

const UpdateCategories = ({ open, handleClose, size, company, currentCategory }) => {
  const [currCategory, setcurrCategory] = useState(currentCategory);

  const handleSubmit = () => {

  }
  useEffect(() => {
    // console.log(currCategory)
  },[currentCategory])

  return (
    <div>
      <Modal size={size} open={open} onClose={handleClose}>
        {console.log(currCategory)}
        <Modal.Header>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              size="md"
              type="text"
              placeholder="Category Name..."
              name="categoryName"
              value={currentCategory.categoryName}
              onChange={(e) => {
                setcurrCategory({
                  ...currCategory,
                  categoryName: e.target.value,
                });
              }}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
            />
            {/* {errors.categoryName && (
              <div className="text-red-500">{errors.categoryName}</div>
            )} */}
            <input
              type="file"
              size="md"
              name="categoryImage"
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2"
              onChange={async (e) => {
                setcurrCategory({
                  ...currCategory,
                  categoryImage: await toBase64(e.target.files[0]),
                });
              }}
            />
            {/* {errors.categoryName && (
              <div className="text-red-500">{errors.categoryName}</div>
            )} */}
            <input
              placeholder="Short description of the category..."
              size="md"
              name="categoryDescription"
              value={currentCategory.categoryDescription}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={(e) => {
                setcurrCategory({
                  ...currCategory,
                  categoryDescription: e.target.value,
                });
              }}
            />
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => handleSubmit()}
              >
                Add Category
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateCategories;
