"use client";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { IndexContext } from "../../../context";
import Router from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import BackBtnPop from "@/components/BackBtnPop";
import Signup2 from "./Signup2";

export default function Signup() {
  // const { signupData, setSignupData } = useContext(IndexContext);
  const [stepOne, setStepOne] = useState(true);
  const formRef = useRef();
  let errors = useRef({});
  let checkboxRef = useRef();

  const [errorstate, seterrorstate] = useState({});

  const [passwordShow, setPasswordShow] = useState(false);

  const handleSubmit = async () => {
    const data = new FormData(formRef.current);
    errors = {};
    for (const pair of data.entries()) {
      if (pair[1] === "") {
        errors[`${pair[0]}`] = `${pair[0]} can't be empty `;
      }
    }
    seterrorstate({ ...errors });
    let length = Object.keys(errors).length;
    if (length !== 0) {
      //errror xa bhanee
    } else {
      //error xaina bhane aba tyo accep checked xa ki xaina check garne
      if (checkboxRef.current.checked) {
        //signupdata ma form ref rakhera aba next page ma route gardine
        setSignupData(data);
        Router.push("/login/Signup2");
      } else {
        toast.error("Por favor acepte los términos y condiciones", {
          autoClose: 1000,
          toastId: "errorcondition",
        });
      }
    }
  };
  // const smIpWidth = ;
  const mdIpWidth = 32;
  const lgIpWidth = 36;
  const mdIpWidthHalf = 15;
  const inputStyle = `focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[95vw] md:w-[40rem] lg:w-[${lgIpWidth}rem] h-[2.5rem]`;

  return (
    <div className=" h-fit py-6 w-[100vw] flex flex-col justify-center items-center text-[">
      <BackBtnPop />
      {/* making multi-step form */}
      <div className="hidden mb-[2rem] md:flex">
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
      <div className={ `${stepOne ? 'h-[80vh] flex gap-10 w-[100vw] justify-center' : 'h-auto flex gap-10 w-[100vw] justify-center'}`}>
        <div className={`flex  flex-col ${stepOne ? '': 'w-[95vw]' } items-center`}>
          <div
            className={` w-[100%]  ${
              stepOne ? "md:w-[36rem]" : "md:w-[70vw]"
            }  h-[100%] flex flex-col gap-4  `}
          >
            <div className={`flex flex-col ${stepOne ? '' : 'w-[95%]' }  items-center gap-4`}>
              <h1 className="leading-none text-[2rem] md:text-[3rem] font-semibold text-orange-500">
                Register
              </h1>
              <p className="md:text-[1rem] px-[1vw] font-semibold  text-slate-400">
                {stepOne
                  ? "Disfruta de la mejor experiencia de ventas por Internet"
                  : `¡Estás a unos pasos de disfrutar de tu propio portafolio de
                productos y servicios!`}
              </p>
            </div>
            {stepOne ? (
              <div className="flex flex-col w-[95vw] md:w-[36rem] gap-y-2 md:gap-y-4 m-auto">
                <div className="flex gap-[1vw] sm:gap-[1vw] md:gap-[1rem]">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-[.9rem] md:text-[1.2rem]"
                    >
                      Nombre *{" "}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Escribe tu nombre..."
                      className={`focus:border-orange-500 focus:outline-none px-[1vw] text-[.9rem] md:text-[1.2rem] border-2 rounded-lg w-[47vw] sm:w-[47vw] border-orange-200 md:w-[19.5rem] lg:w-[${(lgIpWidth - 1) / 2}rem] lg:[${
                        (lgIpWidth - 1) / 2
                      }rem] h-[2.5rem]`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="surname"
                      className="text-[.9rem] md:text-[1.2rem]"
                    >
                      Apellidos
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      placeholder="Escribe tus apellidos..."
                      className={`focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg w-[47vw] sm:w-[47vw] border-orange-200 md:w-[19.5rem] lg:w-[${(lgIpWidth - 1) / 2}rem] lg:[${
                        (lgIpWidth - 1) / 2
                      }rem] h-[2.5rem]`}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[.9rem] md:text-[1.2rem]"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Escribe tu E-mail..."
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-[.9rem] md:text-[1.2rem]"
                  >
                    Usuario *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Escribe tu nombre de usuario..."
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-[.9rem] md:text-[1.2rem]"
                  >
                    Contraseña *
                  </label>
                  <input
                    type={passwordShow ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Escribe tu contraseña..."
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="businessname"
                    className="text-[.9rem] md:text-[1.2rem]"
                  >
                    Nombre del negocio{" "}
                    <span style={{ color: "red" }}>
                      (Este nombre nunca podrá ser modificado)
                    </span>{" "}
                    *
                  </label>
                  <input
                    type="text"
                    id="businessname"
                    name="businessname"
                    placeholder="Escribe el nombre de tu negocio..."
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="flex flex-col md:w-[40rem]">
                  <div>
                    <label
                      htmlFor="whatsappnum"
                      className="text-[.9rem] md:text-[1.2rem]"
                    >
                      WhatsApp del negocio *
                    </label>
                    <div className="flex gap-[1vw] md:gap-[1rem]">
                      <input
                        type="number"
                        id="whatsappcc"
                        name="whatsappcc"
                        placeholder="+1"
                        className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[15vw] md:w-[5rem] lg:w-[5rem] h-[2.5rem]"
                      />
                      <input
                        type="number"
                        id="whatsappnum"
                        name="whatsappnum"
                        placeholder="Escribe el WhatsApp del negocio..."
                        className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[79vw] md:w-[34rem] lg:w-[30rem] h-[2.5rem]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    name="termsandcondition"
                    id="termsandcondition"
                    className=""
                  />
                  <label
                    htmlFor="termsandcondition"
                    className="text-[.9rem] md:text-[1.2rem]"
                  >
                    He leído y acepto los
                    <Link href="/docs/terms.html">
                      <span
                        style={{ cursor: "pointer" }}
                        className="text-orange-500"
                      >
                        {" "}
                        Términos y condiciones{" "}
                      </span>
                    </Link>
                    y
                    <Link href="/docs/privacypolicy.html">
                      <span
                        style={{ cursor: "pointer" }}
                        className="text-orange-500"
                      >
                        {" "}
                        Política de privacidad{" "}
                      </span>
                    </Link>
                    de
                    <span className="text-orange-500"> Orange Publicity</span>
                  </label>
                </div>
              </div>
            ) : (
              <Signup2
                passwordShow={passwordShow}
                setPasswordShow={setPasswordShow}
              />
            )}
          </div>
          <div
            className={` w-[95vw] sm:w-[60vw] ${stepOne ? '' : 'md:w-[70vw] lg:w-[80vw]'} ${
              stepOne ? " md:w-[26rem] lg:w-[36rem]" : "md:w-[60vw] lg:w-[60vw]"
            }  flex justify-between mt-[1rem]`}
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
                  type="submit"
                  onClick={() => {
                    setStepOne(false);
                  }}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
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
