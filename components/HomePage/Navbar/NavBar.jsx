import React, { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import Router from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./styles.module.css";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

export default function NavBar() {
  const container = useRef();
  const [showNav, setShowNav] = useState(false);

  //logout
  const logout = () => {
    deleteCookie("accesstoken", { path: "/" });
    Router.push("/login");
  };

  useGSAP(
    () => {
      // gsap code here...
      gsap.from(["#icon", "#links > div", "#buttons > a"], {
        opacity: 0,
        y: -30,
        duration: 0.6,
        stagger: 0.2,
      });
    },
    { scope: container }
  ); // <-- scope is for selector text (optional)

  return (
    <div
      className={` ${styles.navcontainer} w-[100%]  min-h-[11vh] py-2 flex justify-between overflow-hidden items-center px-12`}
      ref={container}
    >
      <div id="icon">
        <Image
          src="/logo.png"
          alt="logo"
          height={90}
          width={90}
          className="ml-10 h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
        />
      </div>
      <div
        className={` ${styles.rightnav} flex gap-10 text-xl font-semibold text-gray-500`}
        id="links"
      >
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Inicio
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Beneficios
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Asesoría
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
      </div>
      <div id="buttons" className={`${styles.rightnav} flex gap-8`}>
        <Link href="/login">
          <div className="flex bg-orange-400 w-[13rem] py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
            <div className="">
              <button type="submit">Iniciar sesión</button>
            </div>
            <div className="w-8 h-8 flex items-center">
              <img src="/login/login.png" alt="" />
            </div>
          </div>
        </Link>
        <Link href="/signup">
          <div className="flex bg-orange-400 w-[13rem] py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
            <div className="">
              <button type="submit">Regístrate</button>
            </div>
            <div className="w-8 h-8 flex items-center ">
              <img src="/login/register.png" alt="" />
            </div>
          </div>
        </Link>
      </div>
      {showNav ? <SideNav /> : null}
      <div className={`${styles.hamicon} hidden z-30 relative h-fit`}>
        {showNav ? (
          <RxCross1
            className="text-[2rem]"
            onClick={() => {
              setShowNav(!showNav);
            }}
          />
        ) : (
          <RxHamburgerMenu
            className="text-[2rem]"
            onClick={() => {
              setShowNav(!showNav);
            }}
          />
        )}
      <div className={` absolute h-[10rem] w-[10rem] bg-orange-500 top-[-6rem] right-[-6rem] rounded-full -z-10`}></div>
      </div>
    </div>
  );
}

const SideNav = () => {
  return (
    <div className="w-[100vw] h-[100vh] z-20 overflow-hidden absolute top-0 left-0 flex flex-col gap-y-8 justify-center items-center bg-slate-300 animate-slidein">
      <div
        className={`  flex flex-col gap-10 text-xl font-semibold text-gray-500`}
        id="links"
      >
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Inicio
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Beneficios
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
        <div className="group">
          <button className="transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-500 hover:bg-clip-text hover:text-transparent">
            Asesoría
          </button>
          <div className="w-[0%] h-1 bg-gradient-to-r from-orange-200 to-orange-500 rounded transition-all duration-200 ease-in-out group-hover:w-[100%]"></div>
        </div>
      </div>
      <div id="buttons" className={` flex flex-col gap-8`}>
        <Link href="/login">
          <div className="flex bg-orange-400 w-[13rem] py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
            <div className="">
              <button type="submit">Iniciar sesión</button>
            </div>
            <div className="w-8 h-8 flex items-center">
              <img src="/login/login.png" alt="" />
            </div>
          </div>
        </Link>
        <Link href="/signup">
          <div className="flex bg-orange-400 w-[13rem] py-2 px-5 rounded text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500">
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
  );
};
