"use client";
import { ThemeButton } from "@/app/components";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Images } from "@/app/images";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const ts = searchParams.get("ts");
  const time = searchParams.get("time");

  const displayDate = ts
    ? new Date(Number(ts)).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Date not found";

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-6 flex flex-col gap-5 md:gap-10 items-center justify-center">
      <Image alt="" src={Images.layout.logo} className="w-32 md:w-48" />
      <div className="mx-auto w-full max-w-4xl flex flex-col items-center gap-4 md:gap-7 justify-center rounded-2xl bg-white p-4  md:p-10 shadow-sm">
        <svg
          width={isMobile ? "80" : "100"}
          height={isMobile ? "80" : "100"}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10C55.75 10 60.75 13.2344 63.2656 17.9844C68.4062 16.4062 74.2188 17.6406 78.2812 21.7188C82.3438 25.7969 83.5938 31.6094 82.0156 36.75C86.7656 39.25 90 44.25 90 50C90 55.75 86.7656 60.75 82.0156 63.2656C83.5938 68.4062 82.3438 74.2188 78.2812 78.2812C74.2188 82.3438 68.3906 83.5938 63.25 82.0156C60.75 86.7656 55.75 90 50 90C44.25 90 39.25 86.7656 36.7344 82.0156C31.5938 83.5938 25.7812 82.3438 21.7188 78.2812C17.6562 74.2188 16.4062 68.3906 17.9844 63.25C13.2344 60.75 10 55.75 10 50C10 44.25 13.2344 39.25 17.9844 36.7344C16.4062 31.5938 17.6406 25.7812 21.7188 21.7188C25.7969 17.6562 31.6094 16.4062 36.75 17.9844C39.25 13.2344 44.25 10 50 10ZM64.2031 35.7188C62.5312 34.5 60.1875 34.875 58.9688 36.5469L45.5938 54.9375L41.4531 50.6562C40.0156 49.1719 37.6406 49.125 36.1562 50.5625C34.6719 52 34.625 54.375 36.0625 55.8594L43.3125 63.3594C44.0781 64.1562 45.1562 64.5781 46.2656 64.5C47.375 64.4219 48.3906 63.8594 49.0469 62.9688L65.0312 40.9531C66.25 39.2813 65.875 36.9375 64.2031 35.7188Z"
            fill="#28C93B"
          />
        </svg>

        <div className="space-y-6 flex flex-col items-center">
          <div className="space-y-6">
            <div className="space-y-2 md:space-y-4 text-center">
              <h2 className="text-neutral-900 text-2xl md:text-4xl">
                Appointment Booked Successfully
              </h2>

              <p className="text-base md:text-xl text-neutral-800">
                We have successfully received your intake information,{" "}
                <br className="hidden md:block" /> and your appointment is
                confirmed for:
              </p>
            </div>

            <div className="text-start text-base justify-center items-center flex flex-col md:text-lg ">
              <h2 className="min-w-40">Date: {displayDate}</h2>
              <h2 className="max-w-43 md:max-w-48 w-full">Time: {time}</h2>
            </div>
          </div>

          <div className="w-fit">
            <ThemeButton
              onClick={() => router.push("/products")}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.59961 6.66657H8.71072C10.2195 6.66657 11.6665 7.26593 12.7334 8.3328C13.8002 9.39968 14.3996 10.8467 14.3996 12.3555V13.7777M1.59961 6.66657L5.86628 10.9332M1.59961 6.66657L5.86628 2.3999"
                    stroke="#F5F7F6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Back To Products"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
