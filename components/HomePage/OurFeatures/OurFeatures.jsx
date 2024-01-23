import React, { useEffect,useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./features.module.css"

const OurFeatures = () => {
  const features = [
    {
      icon: "/rocket.png",
      heading: "Increase your sales and profits",
      description: "You will have more customers ready to buy",
    },
    {
      icon: "/rocket.png",
      heading: "Save money on advertising",
      description:
        "With the basic plan you will be able to have up to 5 advisers connected to respond faster to your clients.",
    },
    {
      icon: "/rocket.png",
      heading: "Always available",
      description:
        "With the basic plan you will be able to have up to 5 advisers connected to respond faster to your clients.",
    },
    {
      icon: "/rocket.png",
      heading: "User friendly admin panel",
      description:
        "With the basic plan you will be able to have up to 5 advisers connected to respond faster to your clients.",
    },
    {
      icon: "/rocket.png",
      heading: "Personalized advice",
      description:
        "With the basic plan you will be able to have up to 5 advisers connected to respond faster to your clients.",
    },
    {
      icon: "/rocket.png",
      heading: "Whatsapp connection",
      description:
        "With the basic plan you will be able to have up to 5 advisers connected to respond faster to your clients.",
    },
  ];
 const container = useRef()
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      // gsap code here...
      gsap.from("#box > div", {
        scrollTrigger: {
          trigger: "#box ",
          start: "top 70%",
          end: "bottom 70%",
        },
        opacity: 0,
        y: -50,
        duration: .8,

      });
    },
    { scope: container }
  );

  return (
    <div id="featurecontainer" className={`${styles.featurecontainer} h-[90vh] bg-slate-200 py-4`} ref={container} >
      <div className={`text-[3rem] text-center pt-3 font-medium md ${styles.text}`}>
        Our Features
      </div>
      <div className="flex flex-wrap gap-x-16  justify-center " id="box">
        {features.map((feature) => {
          return (
            <div
              
              className={` ${styles.onefeature} group flex flex-col transition-all ease-in-out duration-200 rounded-lg w-[30rem] px-6 py-4 mt-10 gap-1 cursor-pointer bg-white shadow-lg hover:shadow-2xl `}
            >
              <div className=" w-[100%] flex justify-center h-[6.5rem]">
                <Image
                  src={feature.icon}
                  height="1280"
                  width="1280"
                  alt="feature icon"
                  className="h-[6rem] w-[6rem] transition-all ease-in-out duration-500 group-hover:mt-[-10px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[1.7rem] font-semibold font-dmsans">
                  {feature.heading}
                </h1>
                <p className="text-[1.2rem] text-gray-400 font-inter">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurFeatures;
