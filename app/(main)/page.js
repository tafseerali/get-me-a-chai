import Image from "next/image";
import { ThemeModeScript } from 'flowbite-react';
import Features from "@/components/Features";
import Inviter from "@/components/Inviter";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#050113] to-[#000000] min-h-screen w-full font-sans text-white">
    
      <div className="intro w-full max-[550px]:justify-center h-screen max-[750px]:relative max-[750px]:overflow-hidden flex max-[750px]:flex-col">
        <div className="main w-1/2 max-[750px]:justify-center max-[550px]:items-center max-[750px]:w-full flex justify-center max-[750px]:z-10">
          <div className="heading w-4/6 h-3/4 max-[1130px]:w-5/6 max-[1130px] flex flex-col justify-end items-start gap-10">
            <div className="headingContainer flex flex-col gap-3">
              <h1 className="font-bold text-6xl max-[1130px]:text-5xl">Let Buy Me a Chai</h1>
              <p className="text-xl leading-tight max-[1130px]:text-[17px] ">
                GetMeaChai is your space to create what excites you most, rough or polished, big or small. Hundreds of thousands of creators use this platform to share videos, podcasts, writing, art, music and more with their most passionate fans.
              </p>
            </div>
            <div className="">
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-lg px-6 py-4 max-[1130px]:px-4 max-[1130px]:py-3 max-[1130px]:text-[15px] text-center me-2 mb-2">Get Started</button>
              <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-6 py-4 max-[1130px]:px-4 max-[1130px]:py-3 max-[1130px]:text-[15px] me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Read More</button>
            </div>
          </div>
        </div>
        <div className="image w-1/2 max-[750px]:w-full flex flex-col justify-center items-center">
          <image className="w-[95%] max-[550px]:h-screen max-[550px]:object-cover rounded-br-[20%] max-[750px]:absolute max-[750px]:top-0 max-[750px]:rounded-none max-[750px]:w-full max-[750px]:opacity-40 rounded-tl-[20%]" src="/introImage.webp" alt="" />
        </div>
      </div>

      <div className="Features w-full flex justify-center items-center max-[550px]:mt-16">
        <Features/>
      </div>

      <div className="Inviter w-full">
        <Inviter/>
      </div>

      <div className="Footer w-full mt-10">
      </div>
    </div>
  );
}
