import React from 'react'
import Image from "next/image";
import { Images } from '../images';
import { ArrowIcon } from '@/public/icons';
const HormonesCard = () => {
  return (
   <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <div className=" rounded-3xl bg-linear-0 from-[#FFF1EB] to-[#ACE0F9] relative overflow-hidden">
            <div className="py-8 lg:px-8 px-4 sm:p-16 grid grid-cols-12 gap-4 bg-[url('/images/logoWhite.svg')] bg-size-[800px] bg-no-repeat! bg-center">
              <h2 className="text-2xl text-center lg:text-start lg:text-4xl text-neutral-900 font-extrabold col-span-12 lg:col-span-6 ">
                Start balancing your hormones with this free guide
              </h2>

              <div className="flex lg:flex-row flex-col items-start col-span-12 lg:col-span-7 gap-4">
                <div className="flex lg:w-auto w-full   flex-col flex-1 gap-1.5">
                  <input
                    className="placeholder:text-[#717680] flex-1  text-base text-neutral-900 rounded-full border-border-primary bg-white shadow py-3 px-5"
                    placeholder="Enter your email"
                  />
                  <span className="text-neutral-800 text-center lg:text-start text-sm font-normal">
                    We care about your data in our privacy policy.
                  </span>
                </div>
                <button className="text-base justify-center lg:justify-start relative lg:w-auto w-full font-medium text-neutral-900 flex items-center gap-2.5 rounded-full group py-3 lg:py-2.5 px-3 shadow ps-5 bg-white">
                  Start Now
                  <span className="flex items-center justify-center h-6.5 lg:h-7.5 group-hover:rotate-0 transition-all duration-500 ease-in-out -rotate-45 w-6.5 lg:w-7.5 rounded-full bg-biloba-flower">
                    <ArrowIcon fill="white" />
                  </span>
                </button>
              </div>
            </div>
            <Image
              alt="pills"
              src={Images.landingPage.pills}
              className=" absolute top-0 end-0 lg:block hidden "
            />
          </div>
        </div>
  )
}

export default HormonesCard
