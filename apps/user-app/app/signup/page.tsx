import SignupCard from "@repo/ui/src/components/Signup";
import React from "react";

function page() {
  return (
    <div className="px-16 w-full h-screen flex justify-center">
      <div className="w-96 lg:w-1/2 h-full border-x border-dashed">
        <div className="px-4 py-8 font-bold text-xl text-black lg:hidden">
          PayGateway
        </div>
        <SignupCard />
      </div>
      <div className="hidden lg:w-1/2 text-black lg:block border-x border-dashed px-16 space-y-6">
        <div className="font-bold text-2xl text-black pt-36">PayGateway</div>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Get started quickly</p>
            <p className="text-sm text-[#3C4257]">
              Integrate with developer-friendly APIs or choose low-code or
              pre-built solutions.
            </p>
          </div>
          <div>
            <p className="font-semibold">Support any business model </p>
            <p className="text-sm text-[#3C4257]">
              E-commerce, subscriptions, SaaS platforms, marketplaces, and
              more—all within a unified platform.
            </p>
          </div>
          <div>
            <p className="font-semibold">Join millions of businesses </p>
            <p className="text-sm text-[#3C4257]">
              Stripe is trusted by ambitious startups and enterprises of every
              size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
