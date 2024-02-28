"use client";
import React, { useState, useEffect } from "react";

import { SelectPicker } from "rsuite";
import { useSearchParams } from "next/navigation";
import axios from "@/app/api/customerAxiosInterceptor";
import StoreNav from "@/components/storecomponents/StoreNav";
import { useStoreContext } from "@/context/storeContext";
import DisplayProducts from "@/components/storecomponents/DisplayProducts";

const Page = () => {
  const { getProducts, getCompanyDet,company } = useStoreContext();

  const searchParams = useSearchParams();
  const companyId = searchParams.get("cmp");
  const companyName = searchParams.get("nm");
  const catName = searchParams.get("cat");
  const [filterValue, setfilterValue] = useState("");

  const [categories, setcategories] = useState([]);
  const [data, setdata] = useState([]);

  const getCategories = async () => {
    try {
      const resp = await axios.get(
        `getcategories/${companyId}?fields=categoryName,categoryDescription,categoryImage`
      );
      setcategories(resp.data);
      setdata(
        resp.data.map((cat) => {
          return {
            label: cat.categoryName,
            value: cat._id,
          };
        })
      );
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    getCategories();
    getCompanyDet(companyName);
    setfilterValue(searchParams.get("cat"));
  }, []);

  return (
    <>
      <StoreNav />

      <div>
        <div className=" w-[95vw] m-auto my-10">
          {company.companyName ? (
            <>
              <h1 className="text-[1.2rem] md:text-[2rem] font-semibold ">
                All Categories
              </h1>
              <div>
                <SelectPicker
                  data={data}
                  searchable={false}
                  value={filterValue}
                  style={{ width: 224, border: "0px" }}
                  placeholder="All Categories"
                  onChange={(value) => {
                    setfilterValue(value);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex gap-2 flex-col">
            <div className="h-[2rem] bg-slate-200 w-[15rem]"></div>
            <div className="h-[3rem] bg-slate-200 w-[15rem]"></div>
            </div>
          )}
          <DisplayProducts filterValue={filterValue} seeAll={false} />
        </div>
      </div>
    </>
  );
};

export default Page;
