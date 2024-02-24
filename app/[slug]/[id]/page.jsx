"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from "@/app/api/customerAxiosInterceptor";
import { useParams } from "next/navigation";
import { useStoreContext } from "@/context/storeContext";

const Page = () => {
  const params = useParams();
  const [currImage, setcurrImage] = useState("");
  const [currProduct, setcurrProduct] = useState({});
  const { addItemToCart } = useStoreContext();

  const getCurrentProduct = async () => {
    try {
      const resp = await axios.get(`getsingleproduct/${params?.id}`);
      setcurrProduct(resp.data);
      setcurrImage(resp.data.images[0]);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, []);

  return (
    <div className="flex justify-center  w-[100vw] h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between items-between mt-10 gap-8 w-[90vw]">
        <div className="flex flex-col justify-center items-center gap-4 py-2 ">
          <div className="md:w-[30rem] :w-[35rem] lg:w-[40rem] flex bg-[#d5d4d415] ">
            <motion.div
              key={currImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0 }}
              className="m-auto"
            >
              <Image
                src={`http://localhost:5001${currImage}`}
                width={100}
                height={100}
                alt="oatimage"
                className=" h-[30rem] w-[30rem] :w-[35rem] lg:w-[40rem]  object-contain"
                unoptimized
              />
            </motion.div>
          </div>
          <div className="flex justify-start overflow-x-scroll gap-4 md:w-[30rem] :w-[35rem] lg:w-[40rem]">
            {currProduct?.images?.map((img, idx) => {
              return (
                <moti
                  key={idx}
                  onClick={() => {
                    setcurrImage(img);
                  }}
                >
                  <Image
                    className="px-3 bg-[#d5d4d415] h-[100%] object-contain"
                    src={`http://localhost:5001${img}`}
                    width={100}
                    height={100}
                    alt="image"
                  />
                </moti>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100%]">
          <div className="flex flex-col gap-2 ml-0 md:ml-20 md:gap-6 w-[100%] ">
            <div>
              <p className="text-gray-500">
                {currProduct?.companyId?.companyName}
              </p>
            </div>
            <div>
              <p className="text-green-900 font-semibold text-[2rem] md:text-[2.5rem]">
                {currProduct?.name}
              </p>
            </div>
            <div>
              <p className="font-extrabold text-green-900 text-[1.6rem] md:text-[2rem]">
                {currProduct.price}$
              </p>
            </div>
            <div
              onClick={() => {
                let item = { ...currProduct };
                item.companyId = currProduct?.companyId?._id;
                item.categoryId = currProduct?.categoryId?._id;
                addItemToCart(item);
              }}
              className="flex w-fit h-[5vh] bg-gray-300 rounded-full  px-10 justify-center items-center gap-3 font-semibold"
            >
              <MdOutlineShoppingCart className="text-[1.5rem]" />
              <button className="bg-gray-300 text-center rounded-full  text-green-800">
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-gray-500">
                Category: {currProduct?.categoryId?.categoryName}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-3">{currProduct?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
