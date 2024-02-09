"use client";
import NavBar from "@/components/HomePage/Navbar/NavBar";
import MobileGif from "@/components/HomePage/MobileGif/MobileGif";
import LandingPage from "@/components/HomePage/LandingPage/LandingPage";
import OurFeatures from "@/components/HomePage/OurFeatures/OurFeatures";
import ManageOrange from "@/components/HomePage/ManageOrange/ManageOrange";
import Footer from "@/components/HomePage/Footer/Footer";
import PageLoader from "@/components/PageLoader";
import axios from "./api/axiosinterceptor";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import protectRoute from "@/utilis/protectRoute";

export default function Page() {
  const router = useRouter();
  const [orange, setorange] = useState([]);

  // const getCompanyDetails = async () => {
  //   try {
  //     let resp = await axios.get("/getorange");
  //     setorange(resp.data.data[0]);
  //   } catch (error) {}
  // };
  useEffect(() => {
    // getCompanyDetails();
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteProtection = async () => {
      if (await protectRoute()) router.push("/dashboard");
    };
    handleRouteProtection();
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      setLoading(true);

      // Listen for the load event
      window.addEventListener("load", handleLoad);
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <NavBar />
          <LandingPage />
          <OurFeatures />
          <MobileGif />
          <ManageOrange />
          <Footer />
        </>
      )}
    </div>
  );
}
