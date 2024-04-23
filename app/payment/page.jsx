"use client";
import React, { useRef, useState, useEffect } from "react";
// import { toast } from "react-toastify";
import axios from "../api/axiosinterceptor";
import { getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";
import Image from "next/image";
import PaymentVerificationUpload from "@/components/paymentpagecomponents/PaymentVerificationUpload";
import { Modal } from "rsuite";
import { makeStripePayment, makePaypalPayment } from "./paymentUtilities";
import protectRoute from "@/utilis/protectRoute";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const toastId = useRef(null);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [gateway, setGateway] = useState("");
  const [refCode, setrefCode] = useState("");

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };

  const sendLicenceVerificationReq = async () => {
    const toastId = toast.loading("Sending Verification Request......");
    try {
      await axios.post(`/sendverificationrequestlicence`, {
        reference: refCode,
        paymentMethod: "Licence Code",
      });
      toast.dismiss(toastId);
      toast.success("Verification Request Sent Successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response.data.msg);
    }
  };

  const handleClose = () => setOpen(false);

  const [orange, setorange] = useState([]);

  const getCompanyDetails = async () => {
    try {
      let resp = await axios.get("/getorange");
      setorange(resp.data.data[0]);
    } catch (error) {}
  };

  const getPrice = async () => {
    try {
      let resp = await axios.get("/getprice", {
        headers: {
          Authorization: `Bearer ${getCookie("accesstoken")}`,
        },
      });
      setPrice(resp.data.data[0].price);
    } catch (error) {}
  };

  // const sendVerReq = async () => {
  //   toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
  //   try {
  //     await axios.get("/verifyreq", {
  //       headers: {
  //         Authorization: `Bearer ${getCoookie("accesstoken")}`,
  //       },
  //     });
  //     toast.update(toastId.current, {
  //       render: "Solicitud enviada",
  //       type: toast.TYPE.SUCCESS,
  //       autoClose: 1000,
  //       isLoading: false,
  //     });
  //   } catch (error) {
  //     error.response !== undefined
  //       ? toast.update(toastId.current, {
  //           render: error.response.data.msg,
  //           type: toast.TYPE.ERROR,
  //           autoClose: 1000,
  //           isLoading: false,
  //         })
  //       : toast.update(toastId.current, {
  //           render: "Fallido",
  //           type: toast.TYPE.ERROR,
  //           autoClose: 1000,
  //           isLoading: false,
  //         });
  //   }
  // };

  useEffect(() => {
    const handleRouteProtection = async () => {
      const handleRouteProtection = async () => {
        const resp = await protectRoute();
        if (resp === undefined) router.push("/login");
        else if (resp[0] === true && resp[1] === true)
          router.push("/dashboard");
        else if (resp[0] === true && resp[1] === false) null;
        else if (resp[0] === false && resp[1] === false) router.push("/login");
        else router.push("/login");
      };
      handleRouteProtection();
    };
    handleRouteProtection();
    getPrice();
    getCompanyDetails();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col md:flex-row items-center justify-center px-[10vw] gap-2 md:gap-10">
      <div className="flex justify-center  items-center h-[100%]">
        <div className="w-fit  ">
          <div className="flex justify-between mb-4">
            <p className="text-[1.5rem] md:text-[2rem] text-start">
              {" "}
              Choose Payment Method:
            </p>
            <button
              onClick={() => {
                deleteCookie("token");
                toast.error("Logout Successfull", { duration: 1000 });
                router.push("/login");
              }}
              className=" border-[1px] transition-all ease-in-out duration-300 text-[1.2rem] bg-orange-500 cursor-pointer px-3  rounded font-semibold hover:bg-white hover:border-orange-500 hover:border-[1px]"
            >
              Logout
            </button>
          </div>
          <div className=" flex flex-col gap-6">
            <div
              onClick={() => {
                sendLicenceVerificationReq();
              }}
              className="bg-white flex justify-between px-4 md:px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer  "
            >
              <div className="flex justify-between items-center flex-wrap w-[100%]">
                <div>
                  <p className="text-[1.4rem]">Use License Code</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your text here"
                      onChange={(e) => {
                        setrefCode(e.target.value);
                      }}
                      value={refCode}
                      className="bg-white focus:outline-none text-[1rem] focus:shadow-outline border border-gray-300 rounded-xl py-2 px-4 block w-full appearance-none leading-normal"
                    />
                  </div>
                  <button className="text-sm bg-orange-400 px-2 py-2 rounded text-black hover:shadow-sm hover:shadow-slate-800 ">
                    Send Verification Request
                  </button>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                makeStripePayment();
              }}
              className="bg-white flex justify-between px-4 md:px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div className="flex justify-between items-center">
                <Image
                  onError={(e) => {
                    e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                  }}
                  src="/payment/stripe.png"
                  height={100}
                  width={100}
                  alt="stripe payment image"
                />
                <Image
                  onError={(e) => {
                    e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                  }}
                  src="/payment/stripe2.png"
                  height="1013"
                  width="10126"
                  className="h-[60%] w-[70%] "
                  alt="payment image"
                />
              </div>
            </div>
            <div
              onClick={() => {
                makePaypalPayment();
              }}
              className="bg-white flex justify-between px-4 md:px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image
                  onError={(e) => {
                    e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                  }}
                  src="/payment/paypal.png"
                  height={100}
                  width={100}
                  alt="paypal payment image"
                />
              </div>
            </div>
            <div
              onClick={() => {
                handleOpen("calc(100% - 120px)");
                setGateway("zille");
              }}
              className="bg-white flex justify-between px-4 md:px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image
                  onError={(e) => {
                    e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                  }}
                  src="/payment/zille.png"
                  height={100}
                  width={100}
                  alt="zille payment image"
                />
              </div>
            </div>
            <div
              onClick={() => {
                handleOpen("calc(100% - 120px)");
                setGateway("nequi");
              }}
              className="bg-white flex justify-between px-4 md:px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image
                  onError={(e) => {
                    e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                  }}
                  src="/payment/nequi.png"
                  height={100}
                  width={100}
                  alt="nequi payment image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[100%] items-center">
        <div className="">
          <div className="w-[90vw] md:w-[30vw] px-6 rounded-xl  flex flex-col  bg-white">
            <h1 className="font-semibold text-orange-500 text-[1.6rem] py-2 md:py-4">
              Orange Subscription
            </h1>
            <hr />
            <div className="flex justify-between items-center py-6">
              <p className=" text-[1.2rem] ">Orange Subscription</p>
              <p>1x</p>
              <p className="  text-[1.2rem]">$300/year</p>
            </div>
            <hr />
            <div className="py-6">
              <div className="flex justify-between">
                <p className=" text-[1.2rem] ">Subtotal</p>
                <p className="  text-[1.2rem]">$300</p>
              </div>
              <div className="flex justify-between">
                <p className=" text-[1.2rem] ">Discount</p>
                <p className="  text-[1.2rem]">$0</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between py-4 font-semibold">
              <p className=" text-[1.2rem] ">Total Cost</p>
              <p className="  text-[1.2rem]">$300</p>
            </div>
          </div>
        </div>
      </div>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="py-4">
              <p className="text-[1.5rem] text-slate-600 ">
                Payment information
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentVerificationUpload gateway={gateway} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Page;
