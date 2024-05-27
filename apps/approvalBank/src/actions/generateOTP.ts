function generateOTP(){
    const OTP = Math.round(Math.random()*1000000)
    return OTP;
}

export default generateOTP;