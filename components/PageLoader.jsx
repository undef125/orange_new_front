import React from "react";
import Image from "next/image";

const PageLoader = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center">
      <div className="animate-pulse">
        <Image
          src="/logo.png"
          alt="logo"
          height={180}
          width={180}
          className="ml-10 "
        />
      </div>
    </div>
  );
};

export default PageLoader;
