"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from "@/app/api/customerAxiosInterceptor";
import { useParams } from "next/navigation";
import { useStoreContext } from "@/context/storeContext";
import toast from "react-hot-toast";
import StoreNav from "@/components/storecomponents/StoreNav";

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
    <>
      <StoreNav search={false} />
      <div className="flex justify-center  w-[100vw] h-[100vh] max-w-[100%] ">
        <div className="flex flex-col md:flex-row justify-between items-between mt-10 gap-12 w-[90vw] ">
          {currProduct?.companyId?.companyName ? (
            <>
              <div className="flex flex-col justify-center items-center gap-4  py-2 ">
                <div className="md:w-[30rem] :w-[35rem] lg:w-[40rem] flex bg-[#d5d4d415] ">
                  <motion.div
                    key={currImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.6 } }}
                    exit={{ opacity: 0 }}
                    className="m-auto"
                  >
                    <Image
                      onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
                      src={currImage}
                      width={100}
                      height={100}
                      alt="oatimage"
                      className=" h-[30rem] w-[30rem] :w-[35rem] lg:w-[40rem]  object-contain"
                      unoptimized
                    />
                  </motion.div>
                </div>
                <div className="flex justify-start overflow-x-scroll gap-4 md:w-[30rem] :w-[35rem] lg:w-[40rem] ">
                  {currProduct?.images?.map((img, idx) => {
                    return (
                      <moti
                        key={idx}
                        onClick={() => {
                          setcurrImage(img);
                        }}
                      >
                        <Image
                          onError={(e) => {
                            e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                          }}
                          className="px-3 bg-[#d5d4d415] h-[100%] object-contain"
                          src={`${img}`}
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
                <div className="flex flex-col gap-1 ml-0 md:ml-20 md:gap-3 w-[100%] ">
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
                      item.size = "";
                      addItemToCart(item);
                      toast.success("Item Added To Cart", {
                        duration: 1000,
                      });
                    }}
                    className="flex w-fit h-[5vh] bg-gray-300 rounded-full  px-10 justify-center items-center gap-3 font-semibold cursor-pointer hover:border-[1px] hover:border-black hover:bg-green-100 transition-all ease-in-out duration-300"
                  >
                    <MdOutlineShoppingCart className="text-[1.5rem]" />
                    <button className="text-center rounded-full  text-green-800 ">
                      Add to Cart
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      <span className="font-semibold text-[1.1rem] ">
                        Category:
                      </span>{" "}
                      {currProduct?.categoryId?.categoryName}
                    </p>
                  </div>
                  {currProduct?.model ? (
                    <div>
                      <p className="text-gray-500">
                        <span className="font-semibold text-[1.1rem] ">
                          Model:
                        </span>{" "}
                        {currProduct?.model}
                      </p>
                    </div>
                  ) : null}

                  {currProduct?.howToUse ? (
                    <div className="flex-col gap-2">
                      <p className="text-gray-500 font-semibold text-[1.1rem]">
                        How To Use:
                      </p>
                      <div className="flex-col gap-4">
                        {currProduct?.howToUse?.split("/").map((size, idx) => {
                          return (
                            <div key={idx}>
                              <div className="flex gap-2 items-center">
                                <div className="h-2 w-2 rounded-xl bg-slate-500"></div>
                                <p className="text-gray-500">{size}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {currProduct?.servesFor ? (
                    <div className="flex-col gap-2">
                      <p className="text-gray-500 font-semibold text-[1.1rem]">
                        Serves For:
                      </p>
                      <div className="flex-col gap-4">
                        {currProduct?.servesFor?.split("/").map((size, idx) => {
                          return (
                            <div key={idx}>
                              <div className="flex gap-2 items-center">
                                <div className="h-2 w-2 rounded-xl bg-slate-500"></div>
                                <p className="text-gray-500">{size}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {currProduct?.sizes ? (
                    <>
                      <div className="flex gap-2">
                        <p className="text-gray-500 font-semibold text-[1.1rem]">
                          Sizes:
                        </p>
                        <div className="flex gap-4">
                          {currProduct?.sizes?.map((item, idx) => {
                            return (
                              <div key={idx}>
                                <p className="text-gray-500">
                                  {item.size.toUpperCase()}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-gray-500 font-semibold text-[1.1rem]">
                          In Stock:
                        </p>
                        <div className="flex gap-4">
                          <p className="text-gray-500">
                            {currProduct?.sizes.reduce(
                              (accumulator, currentItem) =>
                                accumulator + currentItem.quantity,
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div>
                    <p className="text-gray-500 mb-3">
                      {currProduct?.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-24 py-2 ">
                <div className="md:w-[30rem] :w-[35rem] lg:w-[40rem] flex  flex-col gap-4">
                  <div className=" h-[30rem] w-[30rem] :w-[35rem] lg:w-[40rem]  object-contain bg-slate-200"></div>
                  <div className="flex justify-start overflow-x-scroll gap-4 md:w-[30rem] :w-[35rem] lg:w-[40rem] ">
                    <div className="px-3 w-[5rem]  h-[5rem] object-contain bg-slate-200"></div>
                    <div className="px-3 w-[5rem]  h-[5rem] object-contain bg-slate-200"></div>
                    <div className="px-3 w-[5rem]  h-[5rem] object-contain bg-slate-200"></div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-[100%] gap-12">
                  <div className="px-3 w-[15rem]  h-[2rem] object-contain bg-slate-200"></div>
                  <div className="px-3 w-[15rem]  h-[2rem] object-contain bg-slate-200"></div>
                  <div className="px-3 w-[15rem]  h-[2rem] object-contain bg-slate-200"></div>
                  <div className="px-3 w-[15rem]  h-[2rem] object-contain bg-slate-200"></div>
                  <div className="px-3 w-[15rem]  h-[2rem] object-contain bg-slate-200"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
