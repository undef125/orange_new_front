"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "@/app/api/axiosinterceptor";
import { deleteCookie } from "cookies-next";

const page = ({ params }) => {

  const finishProcess = () => {
    deleteCookie('token');
    router.push("/")
  }

  const router = useRouter();
  const sendVerificationRequest = async () => {
    console.log(params.paymentm)
    try {
      await axios.post("/sendverificationrequest", {
        method: params.paymentm,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendVerificationRequest();
  }, []);
  return (
    <div className="flex justify-center  w-[100vw] h-[100vh] ">
      <div className="flex flex-col gap-4 justify-start items-center w-[80%] ">
        <div>
          <Image
            src="/mobile2.png"
            width={500}
            height={500}
            alt="mobile picture"
            className=""
          />
        </div>
        <div className="text-green-500 text-bold text-[2.6rem]">Success</div>
        <div className="text-green-500 text-[1.6rem]">
          Your payment has been processed successfully.
        </div>
        <div className="flex gap-2 text-[1.2rem] w-[50%] mx-auto">
          <p className="font-bold">Note: </p>
          <p className="text-gray-500  ">
            Verification process may take upto 3 business day you will be
            informed through email or whatsapp message when it is done.
          </p>
        </div>

        <div onClick={finishProcess} className="bg-orange-500 w-[20vw] h-[5vh] rounded text-center flex items-center justify-center text-[1.4rem] font-semibold text-white cursor-pointer ">
          Finish Process
        </div>
      </div>
    </div>
  );
};

export default page;
