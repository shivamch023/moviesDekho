"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFilm } from "react-icons/fa";
import { IoCloseSharp, IoPersonCircleSharp } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Variants for the drawer animation
  const drawerVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // Close the drawer if the viewport width exceeds 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0D1422] text-yellow-500 z-50 md:py-3 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-white  focus:outline-none text-4xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="text-center flex items-center justify-center space-x-2">
            <FaFilm className="text-white text-4xl md:text-4xl" />
            <Link
              href="/"
              className="text-xl md:text-3xl font-bold tracking-wide transition-transform duration-300 hover:scale-105"
            >
              <span className="text-white text-3xl md:text-4xl font-serif">
                M
              </span>
              <span className="text-white text-xl md:text-2xl">ovie</span>
              <span className="text-white text-3xl md:text-4xl font-serif">
                D
              </span>
              <span className="text-white text-xl md:text-2xl">ekho.</span>
            </Link>
          </div>
          {/* Login Link (Mobile) */}
          <div className="md:hidden flex items-center">
            <Link href="/login" className="text-white font-semibold text-4xl">
              <IoPersonCircleSharp />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-5">
            <Link
              href="/new"
              className="hover:text-yellow-300 text-xl font-semibold"
            >
              New
            </Link>
            <Link
              href="/trending"
              className="hover:text-yellow-300 text-xl font-semibold"
            >
              Trending
            </Link>
            <Link
              href="/categories"
              className="hover:text-yellow-300 text-xl font-semibold "
            >
              Categories & Genre
            </Link>
            <Link
              href="/watchlist"
              className="hover:text-yellow-300 text-xl font-semibold"
            >
              Watch List
            </Link>
            <Link
              href="/actoractresspage"
              className="hover:text-yellow-300  text-xl font-semibold"
            >
              Actor & Actress
            </Link>
            <Link href="/login" className="text-white text-4xl font-semibold">
              <IoPersonCircleSharp />
            </Link>
          </div>
        </div>
      </div>

      {/* Sliding Drawer */}
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0  bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed left-0 top-0 h-full w-64 bg-[#0D1422] text-yellow-500 shadow-lg z-50"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={drawerVariants}
          >
            <div className="flex items-center justify-between p-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-white"
              >
                MovieDekho
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white font-bold text-2xl focus:outline-none"
              >
                <IoCloseSharp />
              </button>
            </div>
            <div className="bg-yellow-300 w-full h-0.5"></div>
            <div className=" px-4  mt-[2rem] flex flex-col items-start  gap-2">
              <Link
                onClick={() => setIsOpen(false)}
                href="/new"
                className="block hover:text-yellow-300"
              >
                New Movies
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/categories"
                className="block hover:text-yellow-300 "
              >
                Categories & Genre
              </Link>
              <Link
                href="/watchlist"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Watch List
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/actoractresspage"
                className="hover:text-yellow-300"
              >
                Actor & Actress
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
