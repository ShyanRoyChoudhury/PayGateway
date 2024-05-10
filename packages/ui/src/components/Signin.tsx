"use client";

import { Button } from "./button";

function SigninCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="p-4 md:mt-16 bg-green-800 w-96 h-3/5  rounded-md  bg-white text-[#3C4257] shadow-xl mx-auto">
      <div className="space-y-4">
        <div className=" font-semibold text-2xl">Sign in to your account</div>
        <form className="space-y-8">
          <div className="space-y-2">
            <label>Number</label>
            <input className="text-black w-full outline-blue-400 p-1.5 rounded-md border" />
          </div>
          <div className="space-y-2">
            <label>Password</label>
            <input className="text-black w-full outline-blue-400 p-1.5 rounded-md border" />
          </div>
          <div className="pt-4">
            <Button
              onClick={() => console.log("signin")}
              className="focus:outline-none w-full py-4 bg-[#635BFF]"
            >
              Continue
            </Button>
          </div>
        </form>
        <div className="text-sm flex justify-center space-x-1">
          <div>Don't have an account?</div>
          <a href="signup" className="text-blue-700 hover:text-black">
            Sign up
          </a>
        </div>
      </div>
      {children}
    </div>
  );
}

export default SigninCard;
