import Head from "next/head";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LogoComponent from "../Components/LogoComponent";
import { useState, useEffect } from "react";
import { setLazyProp } from "next/dist/server/api-utils";
import { TypeAnimation } from "react-type-animation";
import moment from "moment";

export default function Home() {
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState(``);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const getNames = async () => {
    setLoading(true);
    try {
      setError(false);
      const res = await fetch(
        // `http://localhost:3000/api/generateNames?slug=${search}`
        `https://brandhive.vercel.app/api/generateNames?slug=${search}`
      );
      setTimeout(function () {
        setError(true);
      }, 5000);
      const data = await res.json();
      setLoading(false);
      setNames(data);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="Brandhive" />
        <meta property="og:site_name" content="Brandhive" />
        <meta property="og:url" content="https://brandhive.vercel.app" />
        <meta
          property="og:description"
          content="Welcome to Brandhive, the ultimate platform for generating new and creative brand names using the power of artificial intelligence (AI). Our website utilizes state-of-the-art algorithms and deep learning models to generate unique, catchy, and memorable brand names that will set your business apart from the competition."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://brandhive.vercel.app/logo.svg"
        />
      </Head>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://www.example.com/page",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "./logo.svg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <div
        className={`flex flex-col  w-screen h-screen items-center md:px-20 py-10 space-y-10`}
      >
        {/* ----------------------------------------------- Logo ---------------------------------------- */}
        <LogoComponent />

        {/* ----------------------------------------------- Hero Section ---------------------------------------- */}
        <div className={`w-3/4 mx-auto`}>
          <h2 className={`font-base text-2xl md:text-5xl text-center `}>
            Empowering Businesses with
            <span className={`font-bold  text-blue-500`}> Creative </span> and
            <span className={`font-bold  text-blue-500`}> Memorable </span>
            Brand Names.
          </h2>
        </div>
        <h5 className={`font-base text-md  text-center text-gray-400 `}>
          AI based Brand Name Generator
        </h5>

        {/* ----------------------------------------------- Search  ---------------------------------------- */}
        <div className={`flex  place-content-center w-full space-x-4 `}>
          <p className="w-fit ">40/{40 - search.length}</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            maxLength={40}
            placeholder="Explain your business "
            className={`md:w-1/2 font-base lg:w-1/4 h-12 px-4 text-xl border-2 border-gray-300 rounded-lg focus:outline-none  focus:border-blue-500`}
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

        {/* ----------------------------------------------- Content ---------------------------------------- */}
        {loading ? (
          <div
            className={`flex flex-col w-full space-y-4 place-content-center`}
          >
            {error ? (
              <h2 className={`font-base text-sm text-red-400 text-center`}>
                Error occured , Please type in your business or refresh
              </h2>
            ) : (
              <h2 className={`font-base text-sm text-green-600 text-center`}>
                Generating names...
              </h2>
            )}
          </div>
        ) : (
          <div
            className={`flex flex-col w-full space-y-4 lg:px-96 place-content-center`}
          >
            <div
              className={`flex flex-wrap mx-auto gap-4  items-center w-fit space-x-2 place-content-center`}
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
                <h2
                  className={`font-base text-sm self-center w-full m-auto text-gray-400 text-center`}
                >
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
