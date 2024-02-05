import React, { useEffect } from "react";

const PersonalizePage = ({ company }) => {
console.log(company)
  useEffect(() => {
    //
  }, []);

  return (
    <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
      <div>
        <div>
          <h1>{company?.companyName.toUpperCase()} Store</h1>
        </div>
      </div>
    </div>
  );
};

export default PersonalizePage;
