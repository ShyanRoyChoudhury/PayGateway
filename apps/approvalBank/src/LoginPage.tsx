import loginApi from "./actions/login";
import safePaymentIcon from "./assets/noun-safe-payment-3862154.svg";
import { ChangeEvent, useState } from "react";

function LoginPage() {

    const [userId, setUserId] = useState<string | null>(null);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setUserId(e.target.value)
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(userId !== null && userId !==''){
           await loginApi(userId);
        }
    }
  return (
    <div className="w-full h-screen  flex items-center justify-center bg-slate-100 md:px-16">
      <div className="md:flex md:flex-row bg-white w-full h-full md:w-5/6 md:h-4/6 p-8 space-y-4 md:space-y-0 overflow-y-auto">
        <div className="w-full md:w-1/2 space-y-4">
          <div className="font-semibold text-lg">Login to NetBanking</div>
          <form className="space-x-2 space-y-2 items-center w-1/2 md:w-full">
            <div className="md:flex space-y-2 md:space-y-0">
              <label className="w-full md:w-1/2">Email?Phone Number</label>
              <div className="w-full md:w-1/2 space-y-4">
                <input className="border-2 px-2 rounded-md w-full  focus:outline-none  focus:shadow-[#1D86FF] focus:border-[#1D86FF]"
                onChange={handleChange}
                required />
                <button
                  onClick={handleSubmit}
                  className="w-full py-2 rounded-md bg-[#1D86FF] text-white font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
          <div className="p-2 bg-[#E2EFFA] text-md">
            <p>Dear Customer,</p>
            <p>Welcome to the new login page of HDFC Bank NetBanking.</p>
            <p>
              Its lighter look and feel is designed to give you the best
              possible user experience. Please continue to login using your
              customer ID and password.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 pl-2">
          <div className="md:flex md:justify-center">
            <img src={safePaymentIcon} className="w-20 h-20" />
          </div>
          <div className="space-y-4">
            <p className="text-sm">Your security is of utmost importance.</p>
            <p>
            <p className="text-lg">First Time User?</p>
            <p className="text-sm">Register Now for a host of convenient features</p>
            </p>
              <p className="text-lg">We have added a host of new features!</p>
            <p>
              
              <p>You can now do so much more:</p>
              <ul className="list-disc text-sm pl-5">
                <li>Anywhere access through Desktop or mobile</li>
                <li>Enhanced security measures</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;