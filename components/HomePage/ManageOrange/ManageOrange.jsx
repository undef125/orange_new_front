import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FaRegCirclePlay } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const ManageOrange = () => {
  const [howItWorks, setHowItWorks] = useState(false);

  const container = useRef();
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap.from("#manageorangeleftsection", {
        scrollTrigger: {
          trigger: "#manageorangeleftsection",
          start: "top 60%",
          end: "bottom 80%",
        },
        duration: 1,
        opacity: 0,
        y: 100,
      });
      gsap.from("#manageorangerightsection", {
        scrollTrigger: {
          trigger: "#manageorangerightsection",
          start: "top 60%",
          end: "bottom 80%",
        },
        duration: 1,
        opacity: 0,
        y: 100,
      });
    },
    { scope: container }
  );

  return (
    <div
      id="manageorangebox"
      className="min-h-[90vh] py-10 md:py-0 bg-slate-200 -z-20 grid grid-cols-1 md:grid-cols-2 px-5 md:px-10 lg:px-28"
      ref={container}
    >
      <div
        id="manageorangeleftsection"
        className="h-[100%] w-[100%]  flex justify-center items-center"
      >
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
            Manage your Orange store instantly
          </h1>
          <p className="text-gray-400 mt-4 text-lg md:text-xl">
            Manage your Orange store on an administration panel. Process your
            orders and understand the behavior of your clients in WhatsApp.
          </p>
          <div className="w-full flex flex-col justify-center mt-6 md:mt-12">
            <div className="flex flex-col justify-center gap-y-8 md:flex-col md:gap-x-16">
              <div className="w-full md:w-[70%] flex flex-col md:flex-row gap-4">
                <Link href="/login">
                  <div className="flex justify-center bg-orange-400 py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-full md:w-[13rem]">
                    <div className="">
                      <button type="submit">Iniciar sesión</button>
                    </div>
                    <div className="w-8 h-8 flex items-center">
                      <img src="/login/login.png" alt="" />
                    </div>
                  </div>
                </Link>
                <Link href="/signup">
                  <div className="flex justify-center bg-orange-400 py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-full md:w-[13rem]">
                    <div className="">
                      <button type="submit">Regístrate</button>
                    </div>
                    <div className="w-8 h-8 flex items-center ">
                      <img src="/login/register.png" alt="" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex gap-6 items-center">
                <div>
                  <FaRegCirclePlay
                    onClick={() => setHowItWorks(true)}
                    className="h-10 w-10 text-slate-500 transition-all duration-500 cursor-pointer hover:text-orange-500 hover:scale-105 hover:rotate-[120deg]"
                  />
                </div>
                <div>
                  <p className="text-lg text-slate-500">How it works</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="manageorangerightsection"
        className="h-[90vh] flex justify-center items-center"
      >
        <div className="h-[80%] ">
          <Image  
onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
            src="/home_page/cstore1.jpg"
            width="2438"
            height="3375"
            alt="store image"
            className="h-[100%] object-cover"
          />
        </div>
      </div>
      {howItWorks ? <YtVideoModel setHowItWorks={setHowItWorks} /> : null}
    </div>
  );
};

const YtVideoModel = ({ setHowItWorks }) => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000087] ">
      <div className="flex justify-center items-center h-[100%] ">
        <div className="flex flex-col-reverse md:flex-row  gap-2 animate-wiggle">
          <video controls autoPlay>
            <source
              src="/video/corporate.mp4"
              height="40vh"
              width="50vw"
              className="h-[40vh]"
            />
          </video>
          <div className="">
            <IoMdClose
              onClick={() => setHowItWorks(false)}
              className="h-10 w-10 absolute md:static right-0 text-red-500 sm:text-black cursor-pointer transition-all duration-300 hover:text-red-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrange;
