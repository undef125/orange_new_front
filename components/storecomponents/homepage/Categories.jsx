import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import axios from "@/app/api/customerAxiosInterceptor";
import { useRouter } from "next/navigation";

const Categories = ({  company,slug }) => {
  const router = useRouter();
  const [categories, setcategories] = useState([]);

  const getCategories = async () => {
    try {
      const resp = await axios.get(
        `getcategories/${company?._id}?fields=categoryName,categoryDescription,categoryImage`
      );
      setcategories(resp.data);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, [company]);

  return (
    <div className="flex w-[95vw] m-auto my-16">
      <div className="grid grid-flow-col-dense  overflow-hidden text-black justify-start gap-6  rounded w-[80%]  md:w-[95vw]  ">
        {categories.map((cat, idx) => {
          return (
            <div
              key={idx}
              className="w-[22rem] h-[10rem] bg-white rounded-md grid grid-cols-2 place-items-center pl-2"
            >
              <div className="">
                <div className="font-semibold text-[1.3rem]">
                  {cat.categoryName}
                </div>
                <div className="text-gray-500">{cat.categoryDescription}</div>
              </div>
              <div className=" px-1">
                <Image
                  src={`http://localhost:5001${cat.categoryImage}`}
                  width={40}
                  height={40}
                  alt="hello"
                  quality={100}
                  unoptimized
                  className="w-[100%] h-[10rem] object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="  bg-[#3bdc5b4b] w-[20%] md:w-[8vw] rounded flex justify-center items-center">
        <div
          className="flex flex-col gap-2"
          onClick={() => {
            router.push(`/${slug}/products?cmp=${company?._id}&nm=${company?.companyName}`);
          }}
        >
          <div className="transition-all ease-in-out duration-300 bg-white rounded-full w-fit p-2 cursor-pointer hover:scale-110">
            <FaArrowRight className="text-[1.5rem]" />
          </div>
          <p className="font-semibold">See All</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
