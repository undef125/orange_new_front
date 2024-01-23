import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

const MobileGif = () => {
  const [iphone, setiphone] = useState(false);

  const container = useRef();
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      // gsap code here...
      gsap.from("#leftsection", {
        scrollTrigger: {
          trigger: "#leftsection",
          start: "top 50%",
          end: "bottom 80%",
        },
        duration: 1,
        opacity: 0,
        x: -100,
      });
      gsap.from("#rightsection", {
        scrollTrigger: {
          trigger: "#rightsection",
          start: "top 50%",
        },
        duration: 1,
        opacity: 0,
        x: 100,
      });
    },
    { scope: container }
  );

  useEffect(() => {
    let plat = window.navigator.userAgent.split("(")[1].split(";")[0];
    plat === "Macintosh" || plat == "iPhone"
      ? setiphone(true)
      : setiphone(false);
  });
  return (
    <div
      id="box"
      className=" -z-20 flex flex-col gap-8 lg:gap-0 py-[5rem] lg:py-0  lg:grid lg:grid-cols-2 lg:px-28"
      ref={container}
    >
      <div
        id="leftsection"
        className={` ${styles.leftsection} h-fit  lg:h-[90vh] flex justify-center items-center z-10 px-28`}
      >
        <div className="relative">
          <Image
            src="/showgif2_1.png"
            alt="home-banner"
            width="1567"
            height="2062"
            className="z-100 min-w-[18rem] sm:min-w-[24rem] md:w-[30rem]"
          ></Image>
          <div className="absolute top-[-4.41rem] left-[3.5%] -z-10 mt-5">
            {iphone ? (
              <img
                src="/video/mobileg.gif"
                className=" h-auto object-cover mt-14 rounded-3xl"
              />
            ) : (
              <video
                autoPlay={true}
                muted={true}
                loop={true}
                height="20%"
                width="60%"
                className=" h-auto object-cover mt-14 rounded-3xl"
              >
                <source src="/video/mobile.mp4" className="w-[400px]" />
              </video>
            )}
          </div>
        </div>
      </div>

      <div
        id="rightsection"
        className={`${styles.rightsection} m-auto h-[100%] w-[95%] lg:w-[100%] flex justify-center items-center `}
      >
        <div className={`flex flex-col gap-2 lg:px-12`}>
          <h1 className="text-[1.5rem] font-bold text-orange-500 sm:text-[2.1rem] lg:text-[2.4rem]">
            Así funciona Orange Publicity
          </h1>
          <p className="text-gray-400 mt-4 text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem]">
            Make life easier for your clients and don't get involved in the
            process.
          </p>
          <div className="w-[100%] flex justify-center mt-4 lg:mt-12">
            <div className="w-[100%]  hidden  md:flex md:flex-row lg:flex lg:flex-row flex-col gap-2 lg:gap-16 ">
              <Link href="/login">
                <div className="flex bg-orange-400 py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-[13rem]">
                  <div className="">
                    <button type="submit">Iniciar sesión</button>
                  </div>
                  <div className="w-8 h-8 flex items-center">
                    <img src="/login/login.png" alt="" />
                  </div>
                </div>
              </Link>
              <Link href="/login/Signup">
                <div className="flex bg-orange-400 py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-[13rem]">
                  <div className="">
                    <button type="submit">Regístrate</button>
                  </div>
                  <div className="w-8 h-8 flex items-center ">
                    <img src="/login/register.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileGif;