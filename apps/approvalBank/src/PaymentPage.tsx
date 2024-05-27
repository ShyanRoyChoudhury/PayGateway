import { useState } from "react";
import generateOTP from "./actions/generateOTP";

function PaymentPage() {
  const [amount, setAmount] = useState<string | null>(null);
  const handleGenerateOTPButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const otp = generateOTP();
  };
  return (
    <div className="w-full h-screen  flex items-center justify-center bg-slate-100 md:px-16">
      <div className="md:flex md:flex-row bg-white w-full h-full md:w-5/6 md:h-4/6 p-8 space-y-4 md:space-y-0 overflow-y-auto">
        <div className="w-full">
          <form>
            <div className="space-y-4">
              <label>Enter Amount</label>
              <div className="space-y-2">
                <input
                  className="border-2 px-2 rounded-md w-full  focus:outline-none  focus:shadow-[#1D86FF] focus:border-[#1D86FF]"
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setAmount(e.target.value);
                  }}
                  required
                />
                <button
                  className="w-full py-2 rounded-md bg-[#1D86FF] text-white font-medium"
                  onSubmit={handleGenerateOTPButton}
                >
                  Generate OTP
                </button>
              </div>
            </div>
          </form>
          <form>
            <div className="w-full md:w-1/2 space-y-4">
              <label>Enter OTP</label>
              <input
                className="border-2 px-2 rounded-md w-full  focus:outline-none  focus:shadow-[#1D86FF] focus:border-[#1D86FF]"
                type="number"
                required
              />
              <button className="w-full py-2 rounded-md bg-[#1D86FF] text-white font-medium">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
