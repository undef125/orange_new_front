import React, { useState, useEffect } from "react";
import { checkoutValidationSchema } from "@/utilis/FormValidationSchema";
import { Modal } from "rsuite";
import { useFormik } from "formik";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";
import { useStoreContext } from "@/context/storeContext";
import { useParams } from "next/navigation";
import toBase64 from "@/utilis/FileToBase64";
import Image from "next/image";

const initialValues = {
  name: "",
  number: "",
  city: "",
  country: "",
  deliveryaddress: "",
};

const CheckOutDetailFillup = ({
  size,
  open,
  handleClose,
  cartItems,
  totalAmount,
}) => {
  const { company, getCompanyDet } = useStoreContext();
  const params = useParams();
  const [nequi, setnequi] = useState(false);
  const [zille, setzille] = useState(false);
  const [paymentProof, setpaymentProof] = useState("");

  const { values, handleBlur, handleChange, handleSubmit, errors, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: checkoutValidationSchema,
      onSubmit: async (values) => {
        try {
          const toastId = toast.loading("confirming order......");
          await axios.post(`/addorder`, {
            products: [...cartItems],
            paymentProof,
            ...values,
            companyId: company?._id,
          });
          setnequi(false);
          setzille(false);
          toast.dismiss(toastId);
          toast.success("Product Added Successfully");
          resetForm();
        } catch (error) {
          toast.dismiss(toastId);
          toast.error("Error adding category!");
        }
      },
    });

  useEffect(() => {
    getCompanyDet(params?.slug);
  }, []);
  return (
    <div>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[90vw] md:w-[100%]"
          >
            <input
              size="md"
              type="text"
              placeholder="Name..."
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}

            <input
              placeholder="Your whatsapp number..."
              size="md"
              name="number"
              value={values.number}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={handleChange}
            />
            {errors.number && (
              <div className="text-red-500">{errors.number}</div>
            )}
            <input
              placeholder="Enter your city..."
              size="md"
              name="city"
              value={values.city}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={handleChange}
            />
            {errors.city && <div className="text-red-500">{errors.city}</div>}
            <input
              placeholder="Enter your country..."
              size="md"
              name="country"
              value={values.country}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={handleChange}
            />
            {errors.country && (
              <div className="text-red-500">{errors.country}</div>
            )}
            <input
              placeholder="Enter your delivery address..."
              size="md"
              name="deliveryaddress"
              value={values.deliveryaddress}
              className="border-[2px] border-[#B6BBC4] border-solid rounded-md px-2 py-2 focus:outline-none focus:border-[2px] focus:border-orange-500 "
              onChange={handleChange}
            />
            {errors.deliveryaddress && (
              <div className="text-red-500">{errors.deliveryaddress}</div>
            )}

            <div className="flex justify-center items-center">
              <button
                type="button"
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                  setnequi(true);
                  setzille(false);
                }}
              >
                Nequi Payment
              </button>
              <button
                type="button"
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                  setnequi(false);
                  setzille(true);
                }}
              >
                Zille Payment
              </button>
              <a
                href={`https://wa.me/+9779864851724?text=${encodeURIComponent(`
                Hello, I want to place an order.
                
My details are as follows:

* Name: ${values.name}  
* Number: ${values.number}
* City: ${values.city}
* Country: ${values.country}
* Delivery address: ${values.deliveryaddress}

Products:
${cartItems.map((prod) => {
  return `
------------------------------------------------------
* Product Name: ${prod.name}
* Product Price: ${prod.price}
* Product Quantity: ${prod.count} 
-----------------------------------------------------`;
})}

________________________________________________________

Total Price: ${totalAmount}
                
                `)}
                
                `}
              >
                <button
                  type="button"
                  className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Whatsapp
                </button>
              </a>
            </div>
          </form>
          {nequi || zille ? (
            <div>
              {/* nequi ra zille ko photo here with proof input */}
              {nequi ? (
                <>
                  <Image
                    // src={`http://localhost:5001${company?.nequi}`}
                    src="/download.png"
                    height={100}
                    width={100}
                    alt="nequir payment qr code"
                  />
                </>
              ) : null}
              {zille ? (
                <div className="flex flex-col">
                  <Image
                    // src={`http://localhost:5001${company?.zille}`}
                    src="/download.png"
                    height={100}
                    width={100}
                    alt="nequir payment qr code"
                  />
                  <label htmlFor="" className="mr-2">
                    {" "}
                    Please upload payment transaction image
                  </label>
                </div>
              ) : null}
              <input
                type="file"
                onChange={async (e) => {
                  setpaymentProof(await toBase64(e.target.files[0]));
                }}
              />
              <button
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                  handleSubmit();
                }}
              >
                Confirm Order
              </button>
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckOutDetailFillup;
