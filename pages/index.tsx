import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LogoComponent from "../Components/LogoComponent";
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import { setLazyProp } from "next/dist/server/api-utils";

export default function Home() {
  const [names, setNames] = useState([]);

  const [search, setSearch] = useState(``);
  const [loading, setLoading] = useState(false);

  const getNames = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/generateNames?slug=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setLoading(false);
    setNames(data);
  };

  return (
    <>
      <div
        className={`flex flex-col  w-screen h-screen items-center md:px-20 py-10 space-y-10`}
      >
        {/* Logo */}
        <LogoComponent />

        {/* Hero Section */}
        <div className={`w-3/4 mx-auto`}>
          <h2 className={`font-base text-2xl md:text-5xl text-center `}>
            Empowering Businesses with
            <span className={`font-bold  text-blue-500`}> Creative </span> and
            <span className={`font-bold  text-blue-500`}> Memorable </span>
            Brand Names.
          </h2>
        </div>

        {/* Search bar */}
        <div className={`flex  place-content-center w-full space-x-4 `}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Explain your business "
            className={`md:w-1/4 h-12 px-4 text-xl border-2 border-gray-300 rounded-lg focus:outline-none  focus:border-blue-500`}
          />
          <button
            onClick={getNames}
            className={`w-fit bg-blue-500 px-3 rounded-lg text-white  hover:bg-blue-600 `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <div
            className={`flex flex-col w-full space-y-4 place-content-center`}
          >
            {" "}
            <h2 className={`font-base text-sm text-gray-400 text-center`}>
              Generating names...
            </h2>
            {` `}
          </div>
        ) : (
          <div
            className={`flex flex-col w-full space-y-4 lg:px-96 place-content-center`}
          >
            
            <div
              className={`flex flex-wrap  gap-4  items-center w-fit space-x-2 place-content-center`}
            >
              {names.length > 0 ? (
                
                names.map((name, index) => {
                  return (
                    <button
                      key={index}
                      className={`px-4 py-2 text-lg font-base w-fit font-medium  rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200`}
                    >
                      {name}
                    </button>
                  );
                })
              ) : (
                <h2 className={`font-base text-sm self-center w-full m-auto text-gray-400 text-center`}>
                  please type in your business 
                </h2>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
