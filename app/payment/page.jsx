"use client";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../api/axiosinterceptor";
import { getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";
import Image from "next/image";
import PaymentVerificationUpload from "@/components/paymentpagecomponents/PaymentVerificationUpload";
import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
import { makeStripePayment, makePaypalPayment } from "./paymentUtilities";

export default function page() {
  const [price, setPrice] = useState(0);
  const toastId = useRef(null);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [gateway, setGateway] = useState("");
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [orange, setorange] = useState([]);

  const getCompanyDetails = async () => {
    try {
      let resp = await axios.get("/getorange");
      setorange(resp.data.data[0]);
    } catch (error) {}
  };

  const logOut = () => {
    deleteCookie("accesstoken", { path: "/" });
    Router.push("/orange");
    toast.success("Desconectado", { autoClose: 1000, toastId: "loggedout" });
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

  const sendVerReq = async () => {
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    try {
      await axios.get("/verifyreq", {
        headers: {
          Authorization: `Bearer ${getCoookie("accesstoken")}`,
        },
      });
      toast.update(toastId.current, {
        render: "Solicitud enviada",
        type: toast.TYPE.SUCCESS,
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      error.response !== undefined
        ? toast.update(toastId.current, {
            render: error.response.data.msg,
            type: toast.TYPE.ERROR,
            autoClose: 1000,
            isLoading: false,
          })
        : toast.update(toastId.current, {
            render: "Fallido",
            type: toast.TYPE.ERROR,
            autoClose: 1000,
            isLoading: false,
          });
    }
  };

  useEffect(() => {
    getPrice();
    getCompanyDetails();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex  items-center justify-center px-[10vw] gap-10">
      <div className="flex justify-center  items-center h-[100%]">
        <div className="w-fit  ">
          <div className="text-[2rem] font-semibold text-start">
            Choose Payment Method:
          </div>
          <div className=" flex flex-col gap-6" >
            <div
              onClick={makeStripePayment}
              className="bg-white flex justify-between px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div className="flex justify-between items-center">
                <Image src="/payment/stripe.png" height={100} width={100} alt="" />
                <Image src="/payment/stripe2.png" height="1013" width="10126" className="h-[60%] w-[70%] "  alt="" />
              </div>
            </div>
            <div
              onClick={makePaypalPayment}
              className="bg-white flex justify-between px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image src="/payment/paypal.png" height={100} width={100} alt="" />
              </div>
            </div>
            <div
              onClick={() => {
                handleOpen("calc(100% - 120px)");
                setGateway('zille')
              }}
              className="bg-white flex justify-between px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image src="/payment/zille.png" height={100} width={100} alt="" />
              </div>
            </div>
            <div
              onClick={() => {
                handleOpen("calc(100% - 120px)");
                setGateway('nequi')
              }}
              className="bg-white flex justify-between px-10 items-center border-[1px] border-slate-600 rounded-xl w-[100%] h-[6rem] text-[2rem] font-medium text-slate-600 cursor-pointer hover:bg-orange-100 hover:border-slate-700 hover:shadow-sm hover:shadow-slate-800  "
            >
              <div>
                <Image src="/payment/nequi.png" height={100} width={100} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[100%] items-center">
        <div className="">
          <div className="w-[30vw] px-6 rounded-xl  flex flex-col  bg-white">
            <h1 className="font-semibold text-orange-500 text-[1.6rem] py-4">
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
          <PaymentVerificationUpload gateway={gateway}/>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
