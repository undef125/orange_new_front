import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Image from "next/image";
import { useStoreContext } from "@/context/storeContext";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

const DisplayProducts = ({
  filterValue = "",
  seeAll,
  company,
  limit = false,
}) => {
  const { products, addItemToCart, updateCartItem, cartItems, removeCartItem } =
    useStoreContext();
  const router = useRouter();
  const pathName = usePathname();
  const slug = pathName.split("/")[1];
  const [filteredProd, setfilteredProd] = useState([]);

  const getProductCountInCart = (productId) => {
    const productInCart = cartItems.find(
      (product) => product._id === productId
    );

    if (productInCart) {
      return productInCart.count; // Return count if product exists in cart
    } else {
      return 0; // Return 0 if product does not exist in cart
    }
  };

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
                `/${company?.companyName}/products?cmp=${company?._id}&nm=${
                  company?.companyName
                }&cat=${""}`
              );
            }}
            className="flex justify-center items-center gap-2 text-red-500 pr-4 cursor-pointer group"
          >
            <p className="text-[1.2rem]">See All</p>
            <FaArrowRight className="text-[1.2rem] transition-all ease-in-out duration-300 group-hover:scale-125" />
          </div>
        </div>
      ) : null}

      {filteredProd.length > 0 ? (
        <div className="flex flex-wrap text-black justify-start gap-20 rounded w-[95vw] m-auto my-8 ">
          {limit
            ? filteredProd.slice(0, 8).map((prod, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-[15rem] min-h-[24rem] relative cursor-pointer group flex flex-col justify-start flex-wrap gap-3 bg-white rounded-md hover:shadow-xl transition-all ease-in-out duration-300"
                  >
                    <div
                      onClick={() => {
                        router.push(`/${slug}/${prod?._id}`);
                      }}
                      className="flex justify-end min-h-[12rem]  relative  overflow-hidden group-hover:rounded"
                    >
                      <Image
                        onError={(e) => {
                          e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                        }}
                        src={`${prod.images[0] ? prod.images[0] : ""}`}
                        width={40}
                        height={40}
                        alt="Product image"
                        className="h-[12rem] w-[15rem] object-cover rounded-t-md group-hover:scale-105  transition-all ease-in-out duration-300 "
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
                      className={`px-2 text-center text-gray-500 font-semibold mb-2 ${
                        prod?.discountPrice ? "line-through " : ""
                      } `}
                    >
                      ${prod.price}
                    </div>
                    {prod?.discountPrice ? (
                      <div
                        className={`px-2 text-center text-gray-500 font-semibold mb-2`}
                      >
                        ${prod.discountPrice}
                      </div>
                    ) : null}
                    <div className="flex justify-center py-2 absolute bottom-0 w-[100%]">
                      <div className=" transition-all ease-in-out duration-300 flex  items-center justify-around py-1 bg-green-100 w-[90%] rounded-xl cursor-pointer hover:bg-green-300   ">
                        <CiCircleMinus
                          className="text-[2.2rem] font-semibold hover:scale-110 transition-all duration-300 "
                          onClick={() => {
                            getProductCountInCart(prod?._id) === 0
                              ? ""
                              : updateCartItem(prod?._id, "-");
                            toast.success("Cart Updated", {
                              duration: 1000,
                            });
                          }}
                        />
                        <p className="font-semibold text-[1.1rem]">
                          {getProductCountInCart(prod?._id)}
                        </p>
                        <CiCirclePlus
                          className="text-[2.2rem] font-semibold hover:scale-110 transition-all duration-300 "
                          onClick={() => {
                            getProductCountInCart(prod?._id) === 0
                              ? addItemToCart(prod)
                              : updateCartItem(prod?._id, "+");
                            toast.success("Cart Updated", {
                              duration: 1000,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : filteredProd.map((prod, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-white rounded-md ="
                  >
                    <div
                      onClick={() => {
                        router.push(`/${slug}/${prod?._id}`);
                      }}
                      className="flex justify-end min-h-[12rem] cursor-pointer relative "
                    >
                      <Image
                        onError={(e) => {
                          e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                        }}
                        src={`${prod.images[0] ? prod.images[0] : ""}`}
                        width={40}
                        height={40}
                        alt="Poructs images"
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
                      className={`px-2 text-center text-gray-500 font-semibold mb-2 ${
                        prod?.discountPrice ? "line-through " : ""
                      } `}
                    >
                      ${prod.price}
                    </div>
                    {prod?.discountPrice ? (
                      <div
                        className={`px-2 text-center text-gray-500 font-semibold mb-2`}
                      >
                        ${prod.discountPrice}
                      </div>
                    ) : null}
                    <div className="flex justify-center py-2 absolute bottom-0 w-[100%]">
                      <div className=" transition-all ease-in-out duration-300 flex  items-center justify-around py-1 bg-green-100 w-[90%] rounded-xl cursor-pointer hover:bg-green-300   ">
                        <CiCircleMinus
                          className="text-[2.2rem] font-semibold hover:scale-110 transition-all duration-300 "
                          onClick={() => {
                            getProductCountInCart(prod?._id) === 0
                              ? ""
                              : updateCartItem(prod?._id, "-");
                            toast.success("Cart Updated", {
                              duration: 1000,
                            });
                          }}
                        />
                        <p className="font-semibold text-[1.1rem]">
                          {getProductCountInCart(prod?._id)}
                        </p>
                        <CiCirclePlus
                          className="text-[2.2rem] font-semibold hover:scale-110 transition-all duration-300 "
                          onClick={() => {
                            getProductCountInCart(prod?._id) === 0
                              ? addItemToCart(prod)
                              : updateCartItem(prod?._id, "+");
                            toast.success("Cart Updated", {
                              duration: 1000,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      ) : (
        <div className="flex flex-wrap text-black justify-start gap-20 rounded w-[95vw] m-auto my-8">
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
          <div className="w-[15rem] min-h-[24rem] relative flex flex-col justify-start flex-wrap gap-3 bg-slate-200 rounded-md ="></div>
        </div>
      )}
    </div>
  );
};

export default DisplayProducts;
