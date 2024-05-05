import React, { useState } from "react";
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
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleAddSizeQuantity = () => {
    if (newSize && newQuantity) {
      setSizes([...sizes, { size: newSize, quantity: newQuantity }]);
      setNewSize("");
      setNewQuantity("");
    }
  };

  const handleRemoveSizeQuantity = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

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
        const toastId = toast.loading("adding product......");
        console.log(values.totalQuantity);
        await axios.post(`/addproduct`, {
          ...values,
          companyId: company?._id,
          totalQuantity:
            values.totalQuantity == undefined
              ? sizes.reduce((accumulator, currentItem) => {
                  return accumulator + parseInt(currentItem.quantity);
                }, 0)
              : values.totalQuantity,
          sizes,
        });
        setOpen(false);
        setSizes([]);
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
    <div className="flex justify-center">
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[95vw] md:w-auto"
          >
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
                {errors.categoryId && (
                  <div className="text-red-500">{errors.categoryId}</div>
                )}
              </div>
              <div>
                <input
                  size="md"
                  type="number"
                  placeholder="Total Quantity..."
                  name="totalQuantity"
                  value={values.totalQuantity}
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
              {/* {errors.name && (
                <div className="text-red-500">{errors.description}</div>
              )} */}
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
                  placeholder="Model of your product..."
                  name="model"
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                />
                {/* <input
                  size="md"
                  type="text"
                  placeholder="Shipping Cost of your product..."
                  name="shippingCost"
                  value={values.shippingCost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] my-4 border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[90vw] md:w-[100%] "
                /> */}
            </div>
            <div>
              <h2>Product Sizes and Quantities</h2>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Size"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[30%] md:min-w-[30%] "
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 w-[30%] md:min-w-[30%] "
                />
                <div
                  onClick={() => {
                    handleAddSizeQuantity();
                  }}
                  className="w-[20%] bg-slate-300 flex justify-center items-center text-3xl rounded cursor-pointer hover:shadow-md transition-all ease-in-out duration-300"
                >
                  ✔
                </div>
              </div>
              <ul className="flex flex-wrap gap-4 mt-2">
                {sizes.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    {item.size} - {item.quantity}
                    <button
                      onClick={() => handleRemoveSizeQuantity(index)}
                      className="bg-red-400 py-1 px-2 rounded text-white"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add Product
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProducts;
