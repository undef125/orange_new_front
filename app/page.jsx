"use client";
import NavBar from "@/components/HomePage/Navbar/NavBar";
import MobileGif from "@/components/HomePage/MobileGif/MobileGif";
import LandingPage from "@/components/HomePage/LandingPage/LandingPage";
import OurFeatures from "@/components/HomePage/OurFeatures/OurFeatures";
import ManageOrange from "@/components/HomePage/ManageOrange/ManageOrange";
import Footer from "@/components/HomePage/Footer/Footer";
import PageLoader from "@/components/PageLoader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import protectRoute from "@/utilis/protectRoute";

export default function Page() {
  const router = useRouter();
  const [orange, setorange] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteProtection = async () => {
      setLoading(true);
      const resp = await protectRoute();
      if(resp === undefined) null
      else if(resp[0] === true && resp[1] === true) router.push('/dashboard')
      else if(resp[0] === true && resp[1]=== false) router.push('/payment');
      else if(resp[0] === false && resp[1]=== false) null
      else null
      setLoading(false);
    };
    handleRouteProtection();
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
