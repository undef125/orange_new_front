"use client";
import React, { useState, useEffect } from "react";
import axios from "@/app/api/customerAxiosInterceptor";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StoreNav from "@/components/storecomponents/StoreNav";

const Page = () => {
    const router = useRouter();
  const [categories, setcategories] = useState([]);
  const searchParams = useSearchParams();
  const companyId = searchParams.get("cmp");
  const companyName = searchParams.get("nm");
  const getCategories = async () => {
    try {
      const resp = await axios.get(
        `getcategories/${companyId}?fields=categoryName,categoryDescription,categoryImage`
      );
      setcategories(resp.data);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>

    <StoreNav />
    <div className="flex flex-col w-[95vw] m-auto my-16">
      <h1 className="text-[1.2rem] md:text-[2rem] font-semibold mb-8">
        All Categories
      </h1>
      <div>
        <div className="flex flex-wrap overflow-hidden text-black justify-start gap-6  rounded w-[80%]  md:w-[95vw]  ">
          {categories.map((cat, idx) => {
            return (
              <div
                key={idx}
                className="flex  flex-col-reverse w-[22rem] h-[20rem] bg-white rounded-md group relative  "
              >
                <div className="mt-[.5rem] p-2 flex flex-col gap-2">
                  <div className="font-semibold text-[1.3rem]">
                    {cat.categoryName}
                  </div>
                  <div className="text-gray-500 text-[1.1rem]">{cat.categoryDescription}</div>
                </div>
                <div className=" px-1">
                  <Image
                    src={`${cat.categoryImage}`}
                    width={40}
                    height={40}
                    alt="hello"
                    quality={100}
                    unoptimized
                    className="w-[100%] h-[15rem] object-cover"
                  />
                </div>
                <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f86f] ">
                    <button
                      className="transition-all ease-in-out duration-300 text-[1.2rem] bg-orange-500 cursor-pointer px-2 py-1 rounded font-semibold hover:bg-white hover:border-orange-500 hover:border-[1px]"
                      onClick={() => {
                        router.push(
                            `/${companyName}/products?cmp=${companyId}&nm=${companyName}&cat=${cat._id}`
                          );
                      }}
                    > See Products </button>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
