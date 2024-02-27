"use client";
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";

import { useParams } from "next/navigation";
import Categories from "@/components/storecomponents/homepage/Categories";
import DisplayProducts from "@/components/storecomponents/DisplayProducts";
import { useStoreContext } from "@/context/storeContext";
import StoreFooter from "@/components/storecomponents/StoreFooter";
import StoreNav from "@/components/storecomponents/StoreNav";
import { useRouter } from "next/navigation";
import { InfinitySpin, Oval } from "react-loader-spinner";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [ loading, setLoading ] = useState(false)
  const { getCompanyDet, company } = useStoreContext();

  useLayoutEffect(() => {
    setLoading(true);
    getCompanyDet(params?.slug);
    setLoading(false);
  }, []);

  return (
    <>
      {company?.companyName?.length > 0 ? (
        <>
          <div className="flex flex-col gap-4 items-center">
            <StoreNav />
            <div className="flex flex-col md:flex-row rounded justify-around  gap-[4vh] bg-[#064C4F] h-[58vh] w-[95vw] mb-8 p-2">
              <div className="flex flex-col gap-8 justify-center pl-[6rem]">
                <div>
                  <p className="font-extrabold text-3xl md:text-5xl text-[#aee5bb]">
                    {company?.shortReview}
                  </p>
                </div>
                <div>
                  <p className="text-[#eaf0eb] text-xl md:text-2xl">
                    {company?.description}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      router.push(
                        `/${params?.slug}/products?cmp=${company?._id}&nm=${company?.companyName}`
                      );
                    }}
                    className="bg-[#65B741] h-[5vh] px-[1rem] rounded hover:text-gray-200 font-semibold transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="flex w-[100%] md:w-[50%] flex-end ">
                {company?.coverImage && <Image
                  src={company?.coverImage}
                  height={150}
                  width={300}
                  className="w-[100%] object-cover"
                  alt="banner image"
                />}
              </div>
            </div>
            <Categories company={company} slug={params.slug} />
            <DisplayProducts
              company={company}
              slug={params?.slug}
              seeAll={true}
            />
            <StoreFooter company={company} />
          </div>
        </>
        ) : (
         <div className="flex flex-col justify-center items-center animate-pulse w-screen h-screen max-w-[100%]">
           <h1 className="text-[4rem] font-semibold">Loading Your Store</h1>
           <h1 className="text-[5rem] font-semibold">{params?.slug}</h1>
         </div>
       )}
    </>
  );
};

export default Page;
