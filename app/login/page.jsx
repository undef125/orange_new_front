"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "../api/axiosinterceptor";
import { Oval } from "react-loader-spinner";
import BackBtnPop from "../../components/BackBtnPop";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/utilis/FormValidationSchema";
import protectRoute from "@/utilis/protectRoute";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-hot-toast";

const initialValuesLogin = {
  emailorusername: "",
  password: "",
};

const Login = () => {
  const router = useRouter();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("loggin in......");
      try {
        const resp = await axios.post("/login", values);
        if (resp.data.isVerified) {
          router.push("/dashboard");
        } else {
          router.push("/payment");
        }
        setCookie("token", resp.data.token);
        toast.dismiss(toastId);
        toast.success(`Login Successful`, {
          duration: 3000,
        });
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(`error: ${error?.response?.data?.error}`, {
          duration: 3000,
        });
      }
    },
  });
  //for popup of password reset
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [isLoading, setisLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    const handleRouteProtection = async () => {
      const resp = await protectRoute();
      if (resp === undefined) null;
      else if (resp[0] === true && resp[1] === true) router.push("/dashboard");
      else if (resp[0] === true && resp[1] === false) router.push("/payment");
      else if (resp[0] === false && resp[1] === false) null;
      else null;
    };
    handleRouteProtection();
  }, [isLoading]);

  return (
    <>
      <BackBtnPop />
      {isLoading ? (
        <div>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#e06331"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : null}

      <section className=" h-[100vh] w-[100vw] flex justify-center items-center overflow-hidden">
        <div className=" md:grid md:grid-cols-2 md:gap-x-[6rem] py-10  w-fit">
          <div className=" h-[70%] hidden md:flex  ">
            <div>
              <Image
                onError={(e) => {
                  e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                }}
                src="/login/login.svg"
                height="500"
                width="500"
                className="sm:min-w-[500px] lg:w-[500px]"
                alt="login page vector image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <h1 className="leading-none text-[2rem] md:text-[3rem] font-semibold text-orange-500">
              Welcome
            </h1>
            <p className="md:text-[1.5rem] text-slate-400">
              Sign in to your orange account
            </p>
            <div className="flex flex-col gap-4 ">
              <div>
                <p>Email/Username</p>
                <input
                  type="text"
                  name="emailorusername"
                  value={values.emailorusername}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="focus:border-orange-500 focus:outline-none px-2 text-[1.2rem] border-2 rounded-lg border-orange-200 w-[95vw] sm:w-[25rem] h-[3rem]"
                />
                {errors.email ? <p>{errors.email}</p> : null}
              </div>
              <div className="relative">
                <p>Password</p>
                <div className="flex">
                  <input
                    name="password"
                    type={passwordShow ? "text" : "password"}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="focus:border-orange-500 focus:outline-none px-2 text-[1.2rem] border-2 rounded-lg border-orange-200 w-[95vw] sm:w-[25rem] h-[3rem]"
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  {passwordShow ? (
                    <GoEyeClosed
                      className="cursor-pointer text-[25px] absolute right-2 top-[50%]"
                      onClick={() => {
                        setPasswordShow(!passwordShow);
                      }}
                    />
                  ) : (
                    <GoEye
                      className="cursor-pointer text-[25px] absolute right-2 top-[50%]"
                      onClick={() => {
                        setPasswordShow(!passwordShow);
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  handleSubmit();
                }}
                className="flex bg-orange-400 justify-center py-2 px-5 rounded-lg text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500"
              >
                <div className="">
                  <button type="button">Iniciar sesión</button>
                </div>
              </div>
              <p
                onClick={() => handleOpen("50rem")}
                className="font-semibold  cursor-pointer self-center"
              >
                Forgot Password?
              </p>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link href="/signup">
                  <span className="cursor-pointer text-orange-400 font-semibold ">
                    Register Now!
                  </span>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ForgotPassword size={size} open={open} handleClose={handleClose} />
      </section>
    </>
  );
};

export default Login;
