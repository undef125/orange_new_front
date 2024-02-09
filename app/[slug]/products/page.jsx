"use client";
import React, { useState, useEffect } from "react";

import { SelectPicker } from "rsuite";
import { useSearchParams } from "next/navigation";
import axios from "@/app/api/customerAxiosInterceptor";
import StoreNav from "@/components/storecomponents/StoreNav";
import { useStoreContext } from "@/context/storeContext";
import DisplayProducts from "@/components/storecomponents/DisplayProducts";

const page = () => {
  const {getProducts, getCompanyDet} = useStoreContext();

  const searchParams = useSearchParams();
  const companyId = searchParams.get("cmp");
  const companyName = searchParams.get("nm");
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
  }, []);

  return (
    <>
      <StoreNav />

      <div>
        <div className=" w-[95vw] m-auto my-10">
          <h1 className="text-[1.2rem] font-semibold ">All Categories</h1>
          <div>
            <SelectPicker
              data={data}
              searchable={false}
              style={{ width: 224, border: "0px" }}
              placeholder="All Categories"
              onChange={(value) => {
                setfilterValue(value)
              }}
            />
          </div>
          <DisplayProducts  filterValue={filterValue} seeAll={false} />
        </div>
      </div>
    </>
  );
};

export default page;
