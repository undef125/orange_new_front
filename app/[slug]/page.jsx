"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Categories from "@/components/storecomponents/homepage/Categories";
import DisplayProducts from "@/components/storecomponents/DisplayProducts";
import { useStoreContext } from "@/context/storeContext";
import StoreFooter from "@/components/storecomponents/StoreFooter";
import StoreNav from "@/components/storecomponents/StoreNav";
import { useRouter } from "next/navigation";
import axios from "@/app/api/axiosinterceptor";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { getCompanyDet, company, colors } = useStoreContext();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await getCompanyDet(params?.slug);
      // await getColorMethod(company?._id);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        backgroundColor: colors?.storeColor ? colors?.storeColor : "#FFFFFF",
      }}
    >
      {company?.companyName && colors?.base ? (
        <>
          <div className="flex flex-col gap-4 items-center">
            <StoreNav />
            <div
              className={`flex flex-col md:flex-row rounded justify-around  gap-[4vh] h-[58vh] w-[95vw] mb-8 p-2`}
              style={{ backgroundColor: colors?.base }}
            >
              <div className="flex flex-col gap-8 justify-center pl-[6rem]">
                <div>
                  <p
                    className="font-extrabold text-3xl md:text-5xl text-[#aee5bb]"
                    style={{ color: colors?.shortReview }}
                  >
                    {company?.shortReview}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[#eaf0eb] text-xl md:text-2xl"
                    style={{ color: colors?.description }}
                  >
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
                    className=" h-[5vh] px-[1rem] rounded hover:text-gray-200 font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: colors?.shopNowBtnColor,
                      color: colors?.shopNowBtnTextColor,
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="flex w-[100%] md:w-[50%] flex-end ">
                {company?.coverImage && (
                  <Image  
                    src={company?.coverImage}
                    height={150}
                    width={300}
                    className="w-[100%] object-cover"
                    alt="banner image"
                    onError={(e) => {
                      e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                    }}
                  />
                )}
              </div>
            </div>
            <Categories company={company} slug={params.slug} />
            <DisplayProducts
              company={company}
              slug={params?.slug}
              seeAll={true}
              limit={true}
            />
            <StoreFooter company={company} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="bg-slate-200 rounded flex justify-between px-10 my-2 gap-6 items-center  w-[95vw] m-auto h-[6rem] animate-pulse "></div>
          <div className="flex flex-col md:flex-row rounded justify-around  gap-[4vh] bg-slate-200 h-[58vh] w-[95vw] mb-8 p-2 animate-pulse"></div>
          <div className="flex w-[95vw] m-auto my-16">
            <div className="grid grid-flow-col-dense  overflow-hidden text-black justify-start gap-6  rounded w-[80%]  md:w-[95vw]  ">
              <div className="w-[22rem] h-[10rem] bg-slate-200 animate-pulse rounded-md grid grid-cols-2 place-items-center pl-2"></div>
              <div className="w-[22rem] h-[10rem] bg-slate-200 animate-pulse rounded-md grid grid-cols-2 place-items-center pl-2"></div>
              <div className="w-[22rem] h-[10rem] bg-slate-200 animate-pulse rounded-md grid grid-cols-2 place-items-center pl-2"></div>
              <div className="w-[22rem] h-[10rem] bg-slate-200 animate-pulse rounded-md grid grid-cols-2 place-items-center pl-2"></div>
            </div>
          </div>
          <DisplayProducts
            company={company}
            slug={params?.slug}
            seeAll={true}
            limit={true}
          />
          <StoreFooter company={company} />
        </div>
      )}
    </div>
  );
};

export default Page;
