"use client";

import { FaPhone, FaEnvelope, FaWhatsapp, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const translations = {
  english: {
    title: "About Us",
    description:
      "MovieDekho is a premium movie website where you can watch and download movies from Hollywood, Bollywood, South Indian, Bhojpuri, and other industries. New movies require a subscription, but old movies are free to watch smoothly. You can also find all types of web series here.",
    owner: "Owner",
    developer: "Developer",
    contact: "Contact Us",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    selectLanguage: "Select Language",
    team: "Our Team",
  },
  hindi: {
    title: "हमारे बारे में",
    description:
      "MovieDekho एक प्रीमियम मूवी वेबसाइट है जहाँ आप हॉलीवुड, बॉलीवुड, साउथ इंडियन, भोजपुरी और अन्य इंडस्ट्री की फ़िल्में देख और डाउनलोड कर सकते हैं। नई मूवी के लिए सब्सक्रिप्शन आवश्यक है, लेकिन पुरानी मूवीज़ मुफ्त में सुचारू रूप से देखी जा सकती हैं। यहाँ सभी प्रकार की वेब सीरीज़ भी उपलब्ध हैं।",
    owner: "मालिक",
    developer: "डेवलपर",
    contact: "संपर्क करें",
    phone: "फोन",
    email: "ईमेल",
    whatsapp: "व्हाट्सएप",
    selectLanguage: "भाषा चुनें",
    team: "हमारी टीम",
  },
  bhojpuri: {
    title: "हमरा बारे में",
    description:
      "MovieDekho एगो प्रीमियम मूवी वेबसाइट बा जहाँ रउआ हॉलीवुड, बॉलीवुड, साउथ इंडियन, भोजपुरी अउरी अउरी इंडस्ट्री के फिल्म देख सकेनी आ डाउनलोडो कर सकेनी। नया मूवी खातिर सब्सक्रिप्शन लागी, बाकि पुरान मूवी फ्री बा। इहाँ सभे टाइप के वेब सीरीजो मिल सकेला।",
    owner: "मालिक",
    developer: "डेवलपर",
    contact: "संपर्क करीं",
    phone: "फोन",
    email: "ईमेल",
    whatsapp: "व्हाट्सएप",
    selectLanguage: "भाषा चुनीं",
    team: "हमार टीम",
  },
} as const;

const teamMembers = [
  {
    name: "Shivam Chauhan",
    role: "Owner & Founder",
    image: "/assets/person.png",
  },
  { name: "Rahul Verma", role: "Assistant", image: "/assets/person.png" },
  {
    name: "Amit Sharma",
    role: "CEO",
    image: "/assets/person.png",
  },
];

type Language = keyof typeof translations;

const AboutUs = () => {
  const [language, setLanguage] = useState<Language>("english");
  const t = translations[language];

  return (
    <div className="bg-[#0D1422] text-white min-h-screen p-6 mt-[6rem] relative">
      {/* Language Selector */}
      <div className="absolute top-2 right-2 z-10 bg-gray-700 p-2 rounded-md flex items-center">
        <FaGlobe className="text-white" size={20} />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-gray-700 text-white border-none outline-none cursor-pointer"
        >
          <option value="english">
            {translations.english.selectLanguage} - English
          </option>
          <option value="hindi">
            {translations.hindi.selectLanguage} - हिन्दी
          </option>
          <option value="bhojpuri">
            {translations.bhojpuri.selectLanguage} - भोजपुरी
          </option>
        </select>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-20">
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/assets/person.png"
            alt="Shivam Chauhan"
            width={200}
            height={200}
            className="rounded-md border-4 border-gray-400"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left mt-6 md:mt-0 md:pl-6">
          <h1 className="text-3xl font-bold text-yellow-400">{t.title}</h1>
          <p className="text-gray-300 mt-4 md:pr-[5rem]">{t.description}</p>
          <p className="text-lg font-semibold mt-4">
            {t.owner}:{" "}
            <span className="text-yellow-200 text-sm">Shivam Chauhan</span>
          </p>
          <p className="text-lg font-semibold">
            {t.developer}:{" "}
            <span className="text-yellow-200 text-sm ">Shivam Chauhan</span>
          </p>
          <div className="mt-6 flex flex-col space-y-3">
            <Link
              href="tel:+91921972354"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-600"
            >
              <FaPhone size={24} />
              <span>{t.phone}: +91 9219723545</span>
            </Link>
            <Link
              href="mailto:info@moviedekho.com"
              className="flex items-center space-x-2 text-red-400 hover:text-red-600"
            >
              <FaEnvelope size={24} />
              <span>{t.email}: info@moviedekho.com</span>
            </Link>
            <Link
              href="https://wa.me/919876543210?text=Hello!%20I%20need%20help%20regarding%20MovieDekho."
              target="_blank"
              className="flex items-center space-x-2 text-green-400 hover:text-green-600"
            >
              <FaWhatsapp size={24} />
              <span>{t.whatsapp}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-yellow-400">{t.team}</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-xl border-2 border-gray-400 "
              />
              <h3 className="text-lg font-semibold mt-2">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
