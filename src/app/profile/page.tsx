"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Profile: React.FC = () => {
  const [mobile, setMobile] = useState<string>("");
  const router = useRouter(); // For redirecting

  useEffect(() => {
    // Ensure we're running in the browser (client-side)
    if (typeof window !== "undefined") {
      const mobileParam = new URLSearchParams(window.location.search).get(
        "mobile"
      );

      if (mobileParam) {
        setMobile(mobileParam); // Set the mobile number from query param
      }
    }
  }, []); // Empty dependency array to run only once when the component mounts

  const handleLogout = () => {
    // Redirect to home page (you can add more logout logic here like clearing tokens)
    router.push("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-[#0D1422] from-[#0A0C13] p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-white text-center mb-6">
        Welcome to Your Profile
      </h2>

      {/* Displaying the mobile number */}
      <div className="mt-4 flex gap-2 text-white text-xl">
        <p className="font-medium">Your Mobile Number:</p>
        <p className="text-lg text-gray-300">{mobile}</p>
      </div>

      {/* Profile details can go here */}

      <div className="mt-8 space-y-4">
        {/* Button to navigate back to the login page */}
        <button
          onClick={handleLogout}
          className="mt-4 text-xl px-15 py-2 bg-gradient-to-r to-rose-500 from-yellow-500 text-white rounded-lg hover:from-rose-500 hover:to-yellow-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
