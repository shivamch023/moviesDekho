"use client";

import Image from "next/image";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-[#0D1422] min-h-screen px-6 py-2 flex flex-col md:flex-row ">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/assets/contact.avif" // replace with your image path
          alt="Contact Us"
          width={400}
          height={400}
          className="rounded-md"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-6 md:mt-0 ">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <div>
            <label htmlFor="name" className="text-white text-lg">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white rounded-md border-2 border-white"
              required
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-white text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white rounded-md border-2 border-white"
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-white text-lg">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white rounded-md border-2 border-white"
              rows={4}
              required
              placeholder="Write Your Messege Here....."
            />
          </div>
          <button
            type="submit"
            className="w-full  py-3 font-bold bg-gradient-to-r to-rose-500 from-yellow-500 text-white rounded-lg hover:from-rose-500 hover:to-yellow-600 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
