import React from "react";
import { productsValidationSchema } from "@/utilis/FormValidationSchema";
import { Modal, SelectPicker } from "rsuite";
import { useFormik } from "formik";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";

const initialValues = {
  name: "",
  description: "",
  price: 0,
  discountPrice: "",
  categoryId: "",
  model: "",
  servesFor: "",
  howToUse: "",
  sizes: "",
  buttonText: "",
  checkoutText: "",
  images: [],
};
const AddProducts = ({
  open,
  handleClose,
  size,
  company,
  setOpen,
  catNames,
  getProducts,
}) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: productsValidationSchema,
    onSubmit: async (values) => {
      try {
        const toastId = toast.loading("adding product......")
         await axios.post(`/addproduct`, {
          ...values,
          companyId: company?._id
        });
        setOpen(false);
        getProducts();
        toast.dismiss(toastId);
        toast.success("Product Added Successfully");
        resetForm();
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Error adding category!");
      }
    },
  });

  return (
    <div className="flex justify-center" >
      <Modal size={size} open={open} onClose={handleClose} >
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[95vw] md:w-auto">
            <div>
              <input
                size="md"
                type="file"
                multiple={true}
                placeholder="Images of product..."
                name="images"
                onChange={(e) => {
                  Array.from(e.target.files).forEach(async (file) => {
                    values.images = [];
                    values.images.push(await toBase64(file));
                  });
                }}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%]"
              />
              {/* {errors.images ? <div> {errors.images}</div> : ""} */}
            </div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 ">
              <div>
                <input
                  size="md"
                  type="text"
                  placeholder="Product Name..."
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
                {errors.name ? (
                  <div className="text-red-500"> {errors.name}</div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  size="md"
                  type="text"
                  placeholder="Product description..."
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
                {errors.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 ">
              <div>
                <input
                  size="md"
                  type="number"
                  placeholder="Price..."
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price}</div>
                )}
              </div>
              <div>
                <input
                  size="md"
                  type="number"
                  placeholder="Discounted price..."
                  name="discountPrice"
                  value={values.discountPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 ">
              <div>
                <SelectPicker
                  data={catNames}
                  searchable={false}
                  // style={{ width: 224 }}
                  className="w-[90vw] md:w-[100%]"
                  placeholder="Select category"
                  onChange={(value) => {
                    setFieldValue("categoryId", value);
                  }}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>
              <div>
                <input
                  size="md"
                  type="text"
                  placeholder="Model of your product..."
                  name="model"
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 ">
              <input
                size="md"
                type="text"
                placeholder="Instruction to use your product..."
                name="howToUse"
                value={values.howToUse}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
              />
              <input
                size="md"
                type="text"
                placeholder="Product serves for..."
                name="servesFor"
                value={values.servesFor}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
              />
              {errors.name && (
                <div className="text-red-500">{errors.description}</div>
              )}
            </div>

            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 ">
              <input
                size="md"
                type="text"
                placeholder="Button text..."
                name="buttonText"
                value={values.buttonText}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
              />
              <input
                size="md"
                type="text"
                placeholder="Checkout button text..."
                name="checkoutText"
                value={values.checkoutText}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
              />
            </div>
            <div>
              <input
                size="md"
                type="text"
                placeholder="Product sizes available..."
                name="sizes"
                value={values.sizes}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                    handleSubmit();
                }}
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

export default AddProducts;
