import SigninCard from "@repo/ui/src/components/Signin";
import React from "react";

function page() {
  return (
    <div className="px-2 md:px-8 lg:px-20 w-full h-screen flex justify-center">
      <div className="border w-5/6 border-x">
        <div className="h-full  border-x border ">
          <div className="px-4 py-8 md:py-16 font-bold text-xl text-black">
            PayGateway
          </div>
          <SigninCard />
        </div>
      </div>
    </div>
  );
}

export default page;
