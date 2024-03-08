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
import { IoMdAdd } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";

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
  const [one, setone] = useState(false);
  const [two, settwo] = useState(false);
  const [paymentProof, setpaymentProof] = useState("");
  const [isChanged, setisChanged] = useState(false);
  const [isAndroid, setisAndroid] = useState(false);
  const [isIos, setisIos] = useState(false);
  const [orange, setorange] = useState({});
  const [orderMethod, setorderMethod] = useState("");

  const { values, handleBlur, handleChange, handleSubmit, errors, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: checkoutValidationSchema,
      onSubmit: async (values) => {
        const toastId = toast.loading("confirming order......");
        try {
          let products = cartItems.map((item) => {
            return {
              productId: item._id,
              image: item.images[0],
              name: item.name,
              price: item.price,
              quantity: item.count,
              size: item.size ? item.size : "",
            };
          });
          await axios.post("addorder", {
            products: products,
            companyId: company?._id,
            ...values,
            totalAmount,
            orderedFrom: orderMethod,
            paymentProof: paymentProof,
          });
          setone(false);
          settwo(false);
          toast.dismiss(toastId);
          handleClose();
          toast.success("Product Added Successfully");
          resetForm();
        } catch (error) {
          toast.dismiss(toastId);
          toast.error("Error adding category!");
        }
      },
    });

  const getOrange = async () => {
    try {
      const data = await axios.get("getorange");
      setorange(data);
    } catch (error) {
      error;
    }
  };

  useEffect(() => {
    getCompanyDet(params?.slug);
    getOrange();
    const isAndroid = () => navigator.userAgent.match(/Android/i);
    const isIOS = () => navigator.userAgent.match(/iPhone|iPad|iPod/i);

    if (isAndroid()) {
      setisAndroid(true)
    } else if (isIOS()) {
      setisIos(true)
    } else {
      setisAndroid(false);
      setisIos(false);
    }
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
              {company?.paymentOne?.qrImage ? (
                <button
                  type="button"
                  className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  onClick={() => {
                    setone(true);
                    settwo(false);
                    setpaymentProof("");
                    setisChanged(false);
                  }}
                >
                  {company?.paymentOne?.methodName
                    ? company?.paymentOne?.methodName
                    : "Payment One"}
                </button>
              ) : null}
              {company?.paymentTwo?.qrImage ? (
                <button
                  type="button"
                  className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  onClick={() => {
                    setone(false);
                    settwo(true);
                    setpaymentProof("");
                    setisChanged(false);
                  }}
                >
                  {company?.paymentTwo?.methodName
                    ? company?.paymentTwo?.methodName
                    : "Payment Two"}
                </button>
              ) : null}

              <a
                href={`https://wa.me/${
                  company?.phone
                }?text=${encodeURIComponent(`
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
* Product Size: ${prod?.size} 
-----------------------------------------------------`;
})}

________________________________________________________

Total Price: ${totalAmount}
                
                `)}
                
                `}
                target="_blank"
              >
                <button
                  type="button"
                  className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  onClick={async () => {
                    setorderMethod("whatsapp");
                    handleSubmit();
                  }}
                >
                  <span className="flex justify-center items-center gap-2">
                    <FaWhatsapp />
                    Whatsapp
                  </span>
                </button>
              </a>
              <a
                href={`sms:${company?.phone}${isAndroid ? "?" : isIos ? "$" : "?"}body=${encodeURIComponent(`
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
* Product Size: ${prod?.size} 
-----------------------------------------------------`;
})}

________________________________________________________

Total Price: ${totalAmount}
                
                `)}`}
              >
                <button
                  type="button"
                  className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  onClick={async () => {
                    setorderMethod("SMS");
                    handleSubmit();
                  }}
                >
                  <span className="flex justify-center items-center gap-2">
                    <MdOutlineTextsms />
                    SMS
                  </span>
                </button>
              </a>
            </div>
          </form>
          {one || two ? (
            <div className="flex justify-center items-center flex-col w-[100%]  py-4">
              <div className="grid  grid-cols-2 mb-2">
                {/* one ra two ko photo here with proof input */}
                {one ? (
                  <>
                    <Image
                      src={`${company?.paymentOne?.qrImage}`}
                      // src="/download.png"
                      height={100}
                      width={100}
                      className="h-[20rem] w-[20rem] p-2 rounded-xl object-cover"
                      alt="oner payment qr code"
                    />
                  </>
                ) : null}
                {two ? (
                  <div className="flex flex-col">
                    <div>
                      <Image
                        src={`${company?.paymentTwo?.qrImage}`}
                        // src="/download.png"
                        height={100}
                        width={100}
                        className="h-[20rem] w-[20rem] p-2 rounded-xl object-cover"
                        alt="oner payment qr code"
                      />
                    </div>
                  </div>
                ) : null}

                {isChanged ? (
                  <>
                    <Image
                      src={paymentProof}
                      // src="/download.png"
                      height={100}
                      width={100}
                      className="h-[20rem] w-[20rem] p-2 rounded-xl object-cover"
                      alt="Payment proof image"
                    />
                  </>
                ) : (
                  <div>
                    <div className="bg-gray-100 cursor-pointer rounded-xl my-auto h-[20rem] w-[20rem] flex justify-center items-center">
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        value={setpaymentProof}
                        onChange={async (e) => {
                          setisChanged(true);
                          setpaymentProof(await toBase64(e.target.files[0]));
                        }}
                      />
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer h-[100%] w-[100%] flex items-center justify-center"
                      >
                        <IoMdAdd className="text-[2rem] " />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="bg-orange-500 font-semibold text-white px-10 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                onClick={() => {
                  paymentProof === ""
                    ? toast.error(
                        "Please add payment proof before comfirming order"
                      )
                    : setorderMethod(
                        one
                          ? company?.paymentOne?.methodName
                          : two
                          ? company?.paymentTwo?.methodName
                          : ""
                      );
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
