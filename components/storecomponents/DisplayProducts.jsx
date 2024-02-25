import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { useStoreContext } from "@/context/storeContext";
import { useRouter, usePathname } from "next/navigation";

const DisplayProducts = ({ filterValue = "", seeAll, company }) => {
  const { products, addItemToCart } = useStoreContext();
  const router = useRouter();
  const pathName = usePathname();
  const slug = pathName.split("/")[1];
  const [filteredProd, setfilteredProd] = useState([]);

  useEffect(() => {
    setfilteredProd(
      filterValue === "" || filterValue === null
        ? products
        : products.filter((prod) => prod?.categoryId === filterValue)
    );
  }, [products, filterValue]);

  return (
    <div className="my-8">
      {seeAll ? (
        <div className="flex justify-between font-semibold w-[95vw] my-4">
          <div className="text-[2rem]">You might need</div>
          <div
            onClick={() => {
              router.push(
                `/${company?.companyName}/products?cmp=${company?._id}&nm=${company?.companyName}&cat=${''}`
              );
            }}
            className="flex justify-center items-center gap-2 text-red-500 pr-4 cursor-pointer group"
          >
            <p className="text-[1.2rem]">See All</p>
            <FaArrowRight className="text-[1.2rem] transition-all ease-in-out duration-300 group-hover:scale-125" />
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap text-black justify-start gap-20 rounded w-[95vw] m-auto my-8">
        {filteredProd.map((prod, idx) => {
          return (
            <div
              key={idx}
              className="w-[15rem] min-h-[20rem] relative flex flex-col justify-start flex-wrap gap-3 bg-white rounded-md"
            >
              <div
                onClick={() => {
                  router.push(`/${slug}/${prod?._id}`);
                }}
                className="flex justify-end min-h-[12rem] cursor-pointer relative "
              >
                <Image
                  src={`${prod.images[0]}`}
                  width={40}
                  height={40}
                  alt="hello"
                  className="h-[12rem] w-[15rem] object-cover rounded-t-md"
                  unoptimized
                />
                {prod?.discountPrice ? (
                <div
                  className={`absolute bg-gray-200 bottom-[2px] left-[4px] px-2 py-1 rounded font-semibold  `}
                >
                  Promo
                </div>
              ) : null}
              </div>
              <div className="font-semibold px-2 text-center text-[1.4rem] text-slate-700 ">
                {prod.name}
              </div>
              <div
                className={`px-2 text-center text-gray-500 font-semibold ${
                  prod?.discountPrice ? "line-through " : ""
                } `}
              >
                ${prod.price}
              </div>
              {prod?.discountPrice ? (
                <div
                  className={`px-2 text-center text-gray-500 font-semibold`}
                >
                  ${prod.discountPrice}
                </div>
              ) : null}
              <div className="flex justify-center py-2">
                <div
                  onClick={() => {
                    addItemToCart(prod);
                  }}
                  className=" transition-all ease-in-out duration-300 flex justify-center bg-[#e4f5eaba] w-[90%] rounded-xl cursor-pointer hover:bg-[#c3c5be]   "
                >
                  <IoMdAdd className="text-[2.2rem]  " />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayProducts;
