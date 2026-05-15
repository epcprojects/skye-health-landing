"use client";
import { ThemeButton } from "@/app/components";
import { toastAlert } from "@/app/components/ToastAlert";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Images } from "@/app/images";
import { clearUserData } from "@/app/Redux/slices/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { ChevronIcon, CrossIcon } from "@/public/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

const Page = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const userData = useAppSelector((state) => state.user);
  const swiperRef2 = useRef<SwiperType | null>(null);

  const date = new Date(userData.appointments[0]?.scheduledAt).getTime();

  const formattedDate = new Date(date).toLocaleString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData?.appointments?.length < 1) {
      router.push("/products");
    }
  }, [userData, router]);

  if (userData?.appointments?.length < 1) return null;

  return (
    <div className="">
      <div className="mx-auto w-full  flex flex-col items-center gap-4 md:gap-7 justify-center p-4  md:p-10 ">
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

        <button
          onClick={() => {
            router.push("/product");
            dispatch(clearUserData());
          }}
          className="bg-neutral-200 hover:bg-neutral-300 cursor-pointer fixed top-4 right-4 rounded-full h-10 flex items-center justify-center w-10"
        >
          <CrossIcon />
        </button>

        <div className="bg-red-500" style={{ display: "contents" }}>
          <div className="space-y-6">
            <div className="space-y-2 md:space-y-4 text-center">
              <h2 className="text-neutral-900 text-2xl font-semibold md:text-4xl">
                Great news!
              </h2>

              <p className="text-base md:text-xl text-neutral-800">
                You have already scheduled your consult at,{" "}
                <span className="font-semibold">{formattedDate}</span> for the
                following products.
              </p>

              <p>
                Click{" "}
                <button
                  onClick={async () => {
                    await fetch("/api/paramount/notifications/resendEmail", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        to: userData.me?.email,
                        firstName: userData.me?.firstName,
                        scheduledAt: date,
                      }),
                    });
                    toastAlert("Email sent successfully", true);
                  }}
                  className="text-secondary font-semibold text-xl cursor-pointer hover:underline underline-offset-2"
                >
                  &apos;here&apos;
                </button>{" "}
                to resend your confirmation email
              </p>
            </div>
          </div>

          <div className="w-fit">
            <ThemeButton
              onClick={() => {
                router.push("/product");
                dispatch(clearUserData());
              }}
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

          <div className="relative w-full max-w-7xl">
            <div className="absolute -left-4 2xl:-left-20 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => swiperRef2.current?.slideNext()}
                className="bg-white rounded-full w-10 h-10   border border-neutral-200 flex items-center justify-center hover:drop-shadow"
              >
                <ChevronIcon />
              </button>
            </div>

            <div className="absolute -right-4 2xl:-right-20 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => swiperRef2.current?.slidePrev()}
                className="bg-white rounded-full rotate-180 w-10 h-10 border border-neutral-200 flex items-center justify-center hover:drop-shadow"
              >
                <ChevronIcon />
              </button>
            </div>
            <Swiper
              pagination={{ clickable: true }}
              autoplay={false}
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={30}
              modules={[Autoplay]}
              className="relative reviewSlider"
              onSwiper={(swiper) => {
                swiperRef2.current = swiper;
              }}
            >
              {userData.selectedProducts.map((p, index) => (
                <SwiperSlide key={index} className="max-w-sm! px-0!">
                  <div className="rounded-3xl cursor-pointer flex-col h-full md:min-h-114.5 gap-6 bg-white shadow-table border relative border-gray-200 p-2 flex items-center justify-center">
                    <div className="bg-[url(/images/productBgPattern.png)] bg-cover h-55 md:h-60 pt-30 lg:pt-3 pb-25 lg:pb-2 bg-position-[0_20px] flex items-center justify-center ">
                      <Image
                        alt=""
                        width={240}
                        height={240}
                        src={
                          p.primaryImage
                            ? p.primaryImage
                            : Images.landingPage.product
                        }
                      />
                    </div>

                    <div className="bg-neutral-100 border border-gray-100 p-2.5 md:p-5 h-full md:min-h-40 w-full rounded-2xl">
                      <div className="flex flex-col h-full gap-3 lg:gap-6 justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-1">
                            <h2 className="text-gunmetal font-medium line-clamp-2 text-lg md:text-xl">
                              {p.name}
                            </h2>
                          </div>

                          <div className="flex items-center flex-wrap gap-2">
                            {p.form && (
                              <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                                {p.form}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:gap-3">
                          <div className="flex items-center justify-end gap-4">
                            <h2 className="text-gunmetal font-bold text-sm md:text-lg lg:text-[28px] min-w-16 text-end">
                              ${p.retailPrice ? p.retailPrice : p.price}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
