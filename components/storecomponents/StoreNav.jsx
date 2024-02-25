import React, { useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useStoreContext } from "@/context/storeContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
const StoreNav = () => {
  const params = useParams();

  const { cartItems, getCompanyDet,company } = useStoreContext();
  const router = useRouter();

  useEffect(() => {
    getCompanyDet(params?.slug)
  },[])

  return (
    <div className="bg-[#064C4F] rounded flex justify-between px-10 my-2 gap-6 items-center  w-[95vw] m-auto  ">
      <div
      onClick={() => {
        router.push(`/${params?.slug}`)
      }}
       className="h-[6rem] flex items-center ">
        <Image
          src={`${company?.logoImage}`}
          height={150}
          width={150}
          className=" h-[2rem] md:h-[5rem] w-[2rem] md:w-[5rem] object-cover rounded-full"
          alt="logo"
        />
      </div>
      <input
        className="rounded-3xl h-[5vh] w-[50vw] text-center "
        type="text"
        placeholder="Search for grocery,vegetables,and meat"
      />
      <div
        onClick={() => {
          router.push(`/${params?.slug}/cart`);
        }}
        className="relative transition-all ease-in-out duration-300 bg-white rounded-full w-fit p-3 cursor-pointer hover:scale-110"
      >
        <MdOutlineShoppingCart className="text-[1.2rem] md:text-[1.5rem]" />
        <div className="absolute top-[-5px] right-[-5px] bg-orange-500 rounded-full h-[25px] w-[25px]">
          <p className=" text-center font-semibold text-white m-auto mt-1 ">
            {cartItems?.length ? cartItems?.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreNav;
