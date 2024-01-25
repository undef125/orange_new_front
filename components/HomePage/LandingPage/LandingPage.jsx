import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function LandingPage() {
  const container = useRef();
  useGSAP(
    () => {
      // gsap code here...
      gsap.from(["#left"], {
        delay: 0.9,
        opacity: 0,
        x: -200,
        duration: 0.6,
      });
      gsap.from(["#right"], {
        delay: 0.9,
        opacity: 0,
        x: 200,
        duration: 0.6,
      });
    },
    { scope: container }
  );
  return (
    <div
      className={` h-[90vh] w-[100vw]  overflow-hidden relative`}
      ref={container}
    >
      <section
        className={` m-auto  h-[100%] w-[90%] sm:w-[100%]  sm:grid grid-cols-3`}
      >
        <div
          id="left"
          className={` pt-[20vh] sm:pt-[30vh] h-[100%] sm:pl-[10%] sm:col-span-2 `}
        >
          <h1 className="leading-none font-semibold mb-8 text-[2rem] sm:text-[2.5rem] md:text-[2.9rem] xl:text-[3.3rem]">
            ¡Vende más en <span className="text-orange-500">menos tiempo!</span>
          </h1>
          <p className="text-orange-500 leading-none text-[1.1rem] sm:text-[2rem] md:text-[2.4rem] ">
            Crea tu tienda de productos y servicios en internet conectada a
            WhatsApp
          </p>
          <div className="w-full flex justify-start mt-8 md:mt-12">
            <div
              className={`${styles.buttonholder} w-full md:w-3/4 lg:w-1/2 xl:w-2/5 flex flex-col md:flex-row gap-2 md:gap-4`}
            >
              <Link href="/login">
                <div className="flex justify-center bg-orange-400 py-2 px-3 md:px-5 rounded text-lg gap-2 md:gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-full md:w-[13rem]">
                  <div className="">
                    <button type="submit">Iniciar sesión</button>
                  </div>
                  <div className="w-8 h-8 flex items-center">
                    <img src="/login/login.png" alt="" />
                  </div>
                </div>
              </Link>
              <Link href="/signup">
                <div className="flex justify-center bg-orange-400 py-2 px-3 md:px-5 rounded text-lg gap-2 md:gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500 w-full md:w-[13rem]">
                  <div className="">
                    <button type="submit">Regístrate</button>
                  </div>
                  <div className="w-8 h-8 flex items-center">
                    <img src="/login/register.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div id="right" className="h-[100%] md:hidden sm:hidden lg:block relative">
          <div className="mt-[3rem] h-[100%] absolute">
            <Image
              src="/goodhhee.png"
              height={1100}
              width={1100}
              alt="hero section image"
              className="lg:h-[78%] lg:w-[100%] md:h-[20rem] md:w-[20rem] object-cover sm:ml-[-5rem] "
              quality="100"
            />
          </div>
          <div className="absolute h-[40rem] w-[40rem] bg-orange-500 top-5 left-40  rounded-full -z-10"></div>
        </div>
      </section>
    </div>
  );
}
