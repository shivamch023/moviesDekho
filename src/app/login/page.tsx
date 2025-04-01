"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp] = useState<string>("1234"); // Random OTP set for testing
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const router = useRouter();

  // Validate Indian number format
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobile(value);
    const indianNumberRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9 and have 10 digits
    setIsValid(indianNumberRegex.test(value));
  };

  // Handle Get OTP click
  const handleGetOtp = () => {
    setIsOtpVisible(true);

    // Simulate sending OTP via SMS (replace this with actual API call)
    console.log("Sending OTP:", generatedOtp);
    sendOtpToMobile(mobile, generatedOtp);
  };

  // Simulated OTP sending function (replace with API call to send OTP via SMS)
  const sendOtpToMobile = (mobileNumber: string, otpCode: string) => {
    console.log(`OTP sent to ${mobileNumber}: ${otpCode}`);
    // Call your backend API to send OTP to the mobile number using Twilio, Nexmo, etc.
  };

  // Handle OTP input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3) {
        const nextInput = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  // Handle OTP submit
  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      router.push("/profile");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-[#0D1422] from-gray-700 p-6">
      {/* Help & Support Button */}
      <button className="absolute flex items-center rounded-xl bg-[#0d14229d] hover:bg-[#0D1422] px-6 py-2 justify-center gap-2 md:top-25 top-22 right-4 text-xl text-white cursor-pointer hover:scale-105 duration-300 transition-all">
        <FaRegQuestionCircle /> Help & Support
      </button>

      {/* Top Image */}
      <Image
        src="/assets/loginmovie.png"
        alt="Top Image"
        className="w-60 h-60 mb-2"
        height={500}
        width={400}
      />

      {/* Heading and Paragraph */}
      <h2 className="text-3xl font-bold text-white">Login To MovieDekho</h2>
      <p className="text-gray-300 mt-2 text-center">
        MovieDekho – Your Gateway to Unlimited Entertainment! 🎬🍿
      </p>

      {/* Login Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="mt-4 text-xl px-15 py-2 bg-gradient-to-r to-rose-500 from-yellow-500 text-white rounded-lg hover:from-rose-500 hover:to-yellow-600 cursor-pointer"
      >
        Log in
      </button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0d1422bb] bg-opacity-50">
          <div className="bg-[#0D1422] p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Icon */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute text-xl cursor-pointer top-3 right-3 text-white hover:text-gray-100"
            >
              ✖
            </button>

            <h3 className="text-2xl font-semibold text-white mb-4">
              Login To Continue
            </h3>

            {/* Mobile Number Input */}
            <div className="relative w-full">
              <input
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter your mobile number"
                className="w-full p-4 pl-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-[#0D1422] text-white placeholder-transparent"
              />
              <span className="absolute left-4 top-4 text-gray-500 text-lg">
                +91
              </span>
            </div>

            {/* Age Confirmation (18+) */}
            <div className="flex items-center mt-8 mb-2">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
                className="mr-2 cursor-pointer"
              />
              <span className="text-white">I confirm I am 18+</span>
            </div>

            {/* Get OTP Button */}
            {isValid && isConfirmed && !isOtpVisible && (
              <button
                onClick={handleGetOtp}
                className="w-full text-xl px-15 py-2 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg hover:from-rose-500 hover:to-yellow-600 cursor-pointer transition-all"
              >
                Get OTP
                <IoMdArrowDropright />
              </button>
            )}

            {/* OTP Input Fields */}
            {isOtpVisible && (
              <div className="flex space-x-2 mt-4 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength={1}
                    className="w-12 h-12 p-4 text-xl text-center bg-[#0D1422] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ))}
              </div>
            )}

            {/* Submit OTP Button */}
            {isOtpVisible && (
              <button
                onClick={handleOtpSubmit}
                className="w-full text-xl px-15 py-2 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg hover:from-rose-500 hover:to-yellow-600 cursor-pointer transition-all mt-4"
              >
                Submit OTP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
