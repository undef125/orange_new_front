import React, { useState, useEffect } from "react";
import axios from "@/app/api/axiosinterceptor";
import ImageCustomizer from "./ImageCustomizer";
import ColorCustomization from "./ColorCustomization";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CustomizeCheckoutDetails from "./CustomizeCheckoutDetails";

const CustomizePage = ({ company, getCompanyDetail }) => {
  const [backup, setbackup] = useState([]);
  const [colors, setColors] = useState();

  const getColorMethod = async (companyId) => {
    try {
      const resp3 = await axios.get(`/getcolors/${companyId}`);
      setColors(resp3.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    // setbackup(company);
    getColorMethod(company?._id);
    // getCompanyDetail();
  }, [company]);

  useEffect(() => {
    getCompanyDetail();
  }, []);

  return (
    <div className="">
      <Tabs className="">
        <TabList className="pt-2 pl-4">
          <Tab>Customize Image</Tab>
          <Tab>Customize Store Color</Tab>
          <Tab>Customize Checkout Details</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ImageCustomizer
              company={company}
              getCompanyDetail={getCompanyDetail}
            />
          </TabPanel>
          <TabPanel>
            <ColorCustomization
              company={company}
              colors={colors}
              getColorMethod={getColorMethod}
            />
          </TabPanel>
          <TabPanel>
            <CustomizeCheckoutDetails company={company} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CustomizePage;
