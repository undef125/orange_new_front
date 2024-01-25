import React from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const styles = {
  width: 300,
  marginBottom: 10
};

const CategoriesPage = () => {
  const dummyCategories = [
    {
      catTitle: "Clothings",
      catImg: "/payment/card.png",
      desc: "something is this something",
    },
    {
      catTitle: "Clothings",
      catImg: "/payment/crypto.png",
      desc: "something is this something",
    },
    {
      catTitle: "Clothings",
      catImg: "/payment/otherpayment.png",
      desc: "something is this something",
    },
  ];
  return (
    <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
      <div className="w-[80%] flex flex-col items-center mt-[1rem]">
        <div>
          <h1 className="text-[2.5rem] text-orange-500 ">
            {" "}
            Manage Your Categories
          </h1>
        </div>
        <div>
          <InputGroup inside style={styles}>
            <Input />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="flex gap-8 w-[100%] px-4 mt-[2rem]">
          {dummyCategories.map((category,index) => {
            return (
              <div key={index} className=" transition-all duration-500 ease-in-out bg-white cursor-pointer group flex flex-col h-[20rem] w-[18rem] rounded hover:shadow-md hover:shadow-slate-500 border-[1px] border-slate-300">
                <div className=" p-4 flex justify-center rounded  ">
                  <Image
                    src={category.catImg}
                    height="1600"
                    width="1574"
                    alt="category related image"
                    className="w-[10rem] h-[10rem] object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                  <div className="flex justify-between items-center ">
                    <h1 className="font-semibold text-[1.2rem]">
                      {category.catTitle}
                    </h1>
                    <TbEdit className="text-[1.6rem] hover:text-orange-500 cursor-pointer " />
                  </div>
                  <p className="text-slate-500">{category.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
