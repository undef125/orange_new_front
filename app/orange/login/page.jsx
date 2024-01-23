"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "@/styles/Login.module.css";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import { IndexContext } from "../../../context";
import * as yup from "yup";
import axios from "../../api/axiosinterceptor";
import { toast } from "react-toastify";
import Router from "next/router";
import { setCookie } from "cookies-next";
import { Oval } from "react-loader-spinner";
import BackBtnPop from "../../../components/BackBtnPop";

const withemail = yup.object().shape({
  email: yup
    .string()
    .email()
    .lowercase()
    .matches(/^[\w.+\-]+@gmail\.com$/)
    .required(),
  password: yup.string().min(1).max(15).required(),
});

const withuname = yup.object().shape({
  username: yup.string().min(1).max(15).lowercase().required(),
  password: yup.string().min(1).max(15).required(),
});

const Login = () => {
  // const { getUserDetails } = useContext(IndexContext);
  const [isLoading, setisLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);

  const emailuserref = useRef(null);
  const passref = useRef(null);
  //if remember me was checked previous there may be username/email in localstorage so set it's value
  useEffect(() => {
    if (localStorage.getItem("email") || localStorage.getItem("username")) {
      emailuserref.current.value =
        localStorage.getItem("email") || localStorage.getItem("username");
      document.getElementById("rememberMe").checked = true;
    }
  }, []);

  //login handler w
  const handleLogin = async (e) => {
    setisLoading(true);
    e.preventDefault();
    let tosend = {
      password: passref.current.value,
    };

    //checking if it's email or password and setting sending object
    if (emailuserref.current.value.length >= 1) {
      if (emailuserref.current.value.includes(".com")) {
        tosend.email = emailuserref.current.value;
        //incase remember me is checked place username/email in localstorage
        if (document.getElementById("rememberMe").checked)
          localStorage.setItem("email", tosend.email);
        // let check = await withemail.isValid(tosend);
      } else {
        tosend.username = emailuserref.current.value;
        if (document.getElementById("rememberMe").checked)
          localStorage.setItem("username", tosend.username);
        // let check = await withuname.isValid(tosend);
      }
    } else {
    }
    // time to post login request
    axios
      .post(`/login`, tosend, {
        withCredentials: true, //needed to receive cookies
        crossDomain: true,
      })
      .then((resp) => {
        setCookie("accesstoken", resp.data.accesstoken, {
          maxAge: 1000 * 60 * 60 * 24,
          path: "/",
          httpOnly: true,
        });
        toast.success("Inicio de sesión exitoso", {
          autoClose: 1000,
          toastId: "loginsuccess",
        });
        Router.push("/payment");
        setisLoading(false);
        getUserDetails();
      })
      .catch((error) => {
        error.response !== undefined
          ? toast.error(error.response.data.message, {
              autoClose: 1000,
              toastId: "emailusererror",
            })
          : toast.error("¡Error al conectarse al servidor!");
        setisLoading(false);
        return;
      });
  };

  useEffect(() => {}, [isLoading]);

  return (
    <>
      <BackBtnPop />
      {isLoading ? (
        <div className={styles.loadercontainer}>
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
                src="/login/login.svg"
                height="500"
                width="500"
                className="sm:min-w-[500px] lg:w-[500px]"
                alt="login page random image"
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
                  type="text "
                  className="focus:border-orange-500 focus:outline-none px-2 text-[1.2rem] border-2 rounded-lg border-orange-200 w-[95vw] sm:w-[25rem] h-[3rem]"
                />
              </div>
              <div className="relative">
                <p>Password</p>
                <div className="flex">
                  <input
                    type={passwordShow ? "text" : "password"}
                    className="focus:border-orange-500 focus:outline-none px-2 text-[1.2rem] border-2 rounded-lg border-orange-200 w-[95vw] sm:w-[25rem] h-[3rem]"
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
                        console.log("gggggggggg");
                        setPasswordShow(!passwordShow);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex bg-orange-400 justify-center py-2 px-5 rounded-lg text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
                <div className="">
                  <button type="submit">Iniciar sesión</button>
                </div>
              </div>
              <p className="font-semibold  cursor-pointer self-center">
                Forgot Password?
              </p>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <span className="cursor-pointer text-orange-400 font-semibold ">
                  Register Now!
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
