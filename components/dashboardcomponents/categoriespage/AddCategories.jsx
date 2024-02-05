import React from "react";
import { categoriesValidationSchema } from "@/utilis/FormValidationSchema";
import { Modal } from "rsuite";
import { useFormik } from "formik";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  categoryName: "",
  categoryImage: "",
  categoryDescription: "",
};
const AddCategories = ({
  open,
  handleClose,
  size,
  company,
  setOpen,
  getCategories,
}) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: categoriesValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/addcategory", {
          ...values,
          companyId: company?._id,
        });
        setOpen(false);
        getCategories();
        toast.success("Category Added Successfully", {
          autoClose: 1000,
        });
        resetForm();
      } catch (error) {
        toast.error("Error adding category!", {
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              size="md"
              type="text"
              placeholder="Category Name..."
              name="categoryName"
              value={values.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
            />
            {errors.categoryName && (
              <div className="text-red-500">{errors.categoryName}</div>
            )}
            <input
              type="file"
              size="md"
              name="categoryImage"
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2"
              onChange={async (e) => {
                setFieldValue(
                  "categoryImage",
                  await toBase64(e.target.files[0])
                );
              }}
            />
            {errors.categoryName && (
              <div className="text-red-500">{errors.categoryName}</div>
            )}
            <input
              placeholder="Short description of the category..."
              size="md"
              name="categoryDescription"
              value={values.categoryDescription}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={handleChange}
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

export default AddCategories;
