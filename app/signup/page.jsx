"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IndexContext } from "../../context";
import Router from "next/router";
import axios from "../api/axiosinterceptor";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import BackBtnPop from "@/components/BackBtnPop";
import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
import { useFormik } from "formik";
import {
  signUpValidationOne,
  signUpValidationTwo,
} from "@/utilis/FormValidationSchema";

const stepOneinitialValues = {
  name: "",
  surname: "",
  email: "",
  userName: "",
  password: "",
  businessName: "",
  businessName: "",
  whatsappcc: "",
  whatsappnum: "",
  isAgreed: false,
};
const stepTwoinitialValues = {
  country: "",
  postalcode: "",
  stateprovince: "",
  city: "",
  description: "",
  short: "",
  coverImage: "",
  logoImage: "",
  telephonecc: "",
  telephonenum: "",
  facebook: "",
  instagram: "",
  youtube: "",
  twitter: "",
  website: "",
  tiktok: "",
  isAgreed: false,
};

export default function Signup() {
  const [stepOne, setStepOne] = useState(true);
  const [formData, setformData] = useState({});
  const toastId = useRef(null);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: stepOneinitialValues,
    validationSchema: signUpValidationOne,
    onSubmit: (values) => {
      setformData({ ...formData, ...values });
      setStepOne(false);
    },
  });
  // two useFormik so not destructuring this to  skip error and will send destructured data while passing to Signup2.jsx component
  const formik = useFormik({
    initialValues: stepTwoinitialValues,
    validationSchema: signUpValidationTwo,
    onSubmit: (values) => {
      // console.log(values)
      setformData({ ...formData, ...values });
      registerUser();
      //call registration api function
    },
  });

  const registerUser = async () => {
    toastId.current = toast.loading("Registering User...", {
      autoClose: false,
    });
    try {
      await axios.post("/registeruser", formData);
      toast.update(toastId.current, {
        render: "User Registered",
        type: toast.TYPE.SUCCESS,
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      console.log("error ", error);
      toast.update(toastId.current, {
        render: "Failed Registering User ",
        type: toast.TYPE.ERROR,
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div className=" h-fit py-6 max-w-[100%] flex flex-col justify-center items-center text-[">
      {console.log(formData)}
      <BackBtnPop />
      {/* making multi-step form */}
      <div className="hidden md:flex">
        <div className="w-[30vw] h-[1px] bg-orange-500 m-auto"></div>
        <div
          onClick={() => {
            setStepOne(true);
          }}
          className={`border-[2px] cursor-pointer border-orange-400 rounded-full h-[4rem] w-[4rem] flex justify-center items-center ${
            stepOne ? "bg-orange-500 text-white" : ""
          }`}
        >
          <div className="font-semibold text-[1.3rem] ">1</div>
        </div>
        <div className="w-[25vw] h-[1px] bg-orange-500 m-auto"></div>
        <div
          onClick={() => {
            setStepOne(false);
          }}
          className={`border-[2px] cursor-pointer border-orange-400 rounded-full h-[4rem] w-[4rem] flex justify-center items-center ${
            stepOne ? "" : "bg-orange-500 text-white"
          }`}
        >
          <div className="font-semibold text-[1.3rem]">2</div>
        </div>
        <div className="w-[25vw] h-[1px] bg-orange-500 m-auto"></div>
      </div>
      {/* the form */}
      <div
        className={` ${
          stepOne
            ? "h-[80vh] flex gap-10 max-w-[100vw] justify-center"
            : "h-auto flex gap-10 max-w-[100vw] justify-center"
        }`}
      >
        <div
          className={`flex  flex-col ${stepOne ? "" : "w-[95vw]"} items-center`}
        >
          <form onSubmit={stepOne ? handleSubmit : formik.handleSubmit}>
            <div
              className={` w-[100%]  ${
                stepOne ? "md:w-[36rem]" : "md:w-[70vw]"
              }  h-[100%] flex flex-col  `}
            >
              <div
                className={`flex flex-col my-4 ${
                  stepOne ? "" : "w-[95%]"
                }  items-center gap-2`}
              >
                <h1 className="leading-none text-[2rem] md:text-[3rem] font-semibold text-orange-500">
                  Register
                </h1>
                <p className="md:text-[1rem] px-1vw font-semibold  text-slate-400">
                  {stepOne
                    ? "Disfruta de la mejor experiencia de ventas por Internet"
                    : `¡Estás a unos pasos de disfrutar de tu propio portafolio de
                productos y servicios!`}
                </p>
              </div>
              {stepOne ? (
                <Signup1
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  passwordShow={passwordShow}
                  setPasswordShow={setPasswordShow}
                />
              ) : (
                <Signup2
                  values={formik.values}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  setFieldValue={formik.setFieldValue}
                  errors={formik.errors}
                  passwordShow={passwordShow}
                  setPasswordShow={setPasswordShow}
                />
              )}
            </div>
            <div
              className={` w-[95vw] pb-8 sm:w-[60vw] ${
                stepOne ? "" : "md:w-[70vw] lg:w-[80vw]"
              } ${
                stepOne
                  ? " md:w-[26rem] lg:w-[36rem]"
                  : "md:w-[60vw] lg:w-[60vw]"
              }  flex justify-between`}
            >
              <div className="flex w-[10rem] md:w-[12rem] bg-orange-400 justify-center py-2 px-5 rounded-lg text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
                <div className="text-[.9rem] md:text-[1.2rem]">
                  <button
                    disabled={stepOne}
                    onClick={() => {
                      setStepOne(true);
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
              <div className="flex w-[10rem] md:w-[12rem] bg-orange-400 justify-center py-2 px-5 rounded-lg text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
                <div className="text-[.9rem] md:text-[1.2rem]">
                  <button
                    type="button"
                    onClick={() => {
                      stepOne ? handleSubmit() : formik.handleSubmit();
                    }}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>

        {stepOne ? (
          <div className="hidden justify-center  items-center  md:flex">
            <div className=" hidden lg:flex  ">
              <div>
                <Image
                  src="/login/signup.svg"
                  height="500"
                  width="500"
                  className="xl:min-w-[30vw] "
                  alt="login page random image"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
