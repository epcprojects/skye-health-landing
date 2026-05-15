"use client";
import {
  AddIcon,
  ArrowIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MedicineIcon,
  PlusIcon,
  PulseIcon,
  RxIcon,
  SecurityCheckIcon,
  StethoscopeIcon,
} from "@/public/icons";
import Image, { StaticImageData } from "next/image";
import { Images } from "../images";
import {
  HowItWorksScrollCards,
  MarqueeCard,
  MarqueeLanding,
} from "../components";
import HormonesCard from "../components/HormonesCard";

import NEWFAQ from "../components/FAQ";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { FETCH_CATEGORIES } from "@/app/graphql/queries/products";
import {
  ALL_PRODUCTS,
  AllProductsType,
  AllProductsVariables,
  ProductType,
} from "@/app/graphql/queries/products";
import { addProductToCart } from "@/app/Redux/slices/cart/cartSlice";
import { useAppDispatch } from "@/app/Redux/store";
import { toastAlert } from "../components/ToastAlert";
import HomePageProductCard from "../components/HomePageProductsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import CategoryCard from "../components/CategoryCard";
import React from "react";

import CapsuleImage from "@/public/images/capsule.png";
import CreamImage from "@/public/images/cream.png";
import InjectableImage from "@/public/images/injectable.png";
import InsertImage from "@/public/images/insert.png";
import NailPolishImage from "@/public/images/Nail Polish.png";
import NasalSprayImage from "@/public/images/Nasal Spray.png";
import OintmentImage from "@/public/images/Ointment.png";
import PatchImage from "@/public/images/Patch.png";
import PrefillesSyringeImage from "@/public/images/Pre-filles Syringe.png";
import ScalpOilImage from "@/public/images/Scalp OIl.png";
import SolutionImage from "@/public/images/Solution.png";
import SuppositoryImage from "@/public/images/Suppository.png";
import TabletImage from "@/public/images/Tablet.png";
import TrichosolSolutionImage from "@/public/images/Trichosol Solution.png";
import TrocheImage from "@/public/images/Troche.png";
import VialImage from "@/public/images/Vial.png";
import { profile } from "console";
import { useRouter } from "next/navigation";

const PER_PAGE = 20;
const MAX_PRODUCTS = 20;
export default function Home() {
  const items = [
    {
      num: "01",
      title: "Online Assessment",
      description:
        "Answer clinically relevant questions about your health goals and history.",
    },
    {
      num: "02",
      title: "Medical Review",
      description: "A licensed provider evaluates your data and lab results.",
    },
    {
      num: "03",
      title: "Personalized Plan",
      description:
        "Receive tailored peptides, hormones, and vitamins designed for you.",
    },
    {
      num: "04",
      title: "Delivery & Support",
      description:
        "Receive tailored peptides, hormones, and vitamins designed for you.",
    },
  ];
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [activeProductFilter, setActiveProductFilter] = useState<
    "in_demand" | "all" | "category"
  >("in_demand");
  const [page, setPage] = useState(1);
  const [extraProducts, setExtraProducts] = useState<ProductType[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data,
    loading,
    error: appolloError,
    fetchMore,
  } = useQuery<AllProductsType, AllProductsVariables>(ALL_PRODUCTS, {
    variables: {
      search: undefined,
      category:
        activeProductFilter === "category"
          ? selectedCategory || undefined
          : undefined,
      in_demand: activeProductFilter === "in_demand" ? true : undefined,
      page: 1,
      perPage: PER_PAGE,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { data: categoriesData } = useQuery<{ productCategories: string[] }>(
    FETCH_CATEGORIES,
    { skip: loading || !!appolloError },
  );

  const productCategories: string[] = categoriesData?.productCategories ?? [];

  const categoryBgClassMap = {
    HRT: "bg-[url('/images/Hormones.png')]",
    "HRT (hormone replacement therapy)": "bg-[url('/images/Hormones.png')]",
    "Weight Loss": "bg-[url('/images/WeightLoss.png')]",
    Immune: "bg-[url('/images/Immune.png')]",
    "Anti-Aging": "bg-[url('/images/Anti-Aging.png')]",
    Recovery: "bg-[url('/images/recovery.png')]",
    "Cognitive Health": "bg-[url('/images/Cognitive.png')]",
  } as const;

  const getCategoryBgClass = (category: string) => {
    return (
      categoryBgClassMap[category as keyof typeof categoryBgClassMap] ||
      "bg-[url('/images/WeightLoss.png')]"
    );
  };

  const getCategoryCardTitle = (category: string) => {
    if (category.includes(">")) {
      return category.split(">").map((part, index, array) => (
        <React.Fragment key={part}>
          {part.trim()}
          {index < array.length - 1 ? " >" : ""}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
    }

    return category;
  };
  const categoryChipImageMap = {
    "General Health": Images.landingPage.GeneralHealthChipImage,
    Hormones: Images.landingPage.HormonesChipImage,
    HRT: Images.landingPage.AntiAgingImage,
    "HRT (hormone replacement therapy)": Images.landingPage.HormonesChipImage,
    Peptides: Images.landingPage.PeptidesChipImage,
    "Sexual Wellness": Images.landingPage.SexualWelnessChipImage,
    Vitamin: Images.landingPage.VitaminChipImage,
    "Weight Loss": Images.landingPage.WeightLossChipImage,
  } as const;

  const getCategoryChipImage = (category: string) => {
    return (
      categoryChipImageMap[category as keyof typeof categoryChipImageMap] ||
      Images.landingPage.GeneralHealthChipImage
    );
  };

  const visibleCategoryNames = [
    "Weight Loss",
    "Immune",
    "Hormones",
    "Anti-Aging",
    "Recovery",
    "Cognitive Health",
  ];
  const isCategoryAvailableFromApi = (category: string) => {
    return productCategories.some(
      (apiCategory) =>
        apiCategory.trim().toLowerCase() === category.trim().toLowerCase(),
    );
  };

  const getCategoryHref = (category: string) => {
    if (isCategoryAvailableFromApi(category)) {
      return `/products?category=${encodeURIComponent(category)}`;
    }

    return "/products";
  };

  const normalizeCategoryName = (category: string) =>
    category.trim().toLowerCase();

  // const orderedProductCategories = useMemo(() => {
  //   const allowedCategoryMap = new Map(
  //     visibleCategoryNames.map((category) => [
  //       normalizeCategoryName(category),
  //       category,
  //     ]),
  //   );

  //   return productCategories
  //     .filter((category) =>
  //       allowedCategoryMap.has(normalizeCategoryName(category)),
  //     )
  //     .sort((a, b) => {
  //       const aIndex = visibleCategoryNames.findIndex(
  //         (category) =>
  //           normalizeCategoryName(category) === normalizeCategoryName(a),
  //       );
  //       const bIndex = visibleCategoryNames.findIndex(
  //         (category) =>
  //           normalizeCategoryName(category) === normalizeCategoryName(b),
  //       );

  //       return aIndex - bIndex;
  //     });
  // }, [productCategories]);

  const orderedProductCategories = useMemo(() => {
    return visibleCategoryNames;
  }, []);

  const firstPageProducts = data?.allProducts?.allData ?? [];

  const allProducts = useMemo(() => {
    const existingIds = new Set<string>();

    return [...firstPageProducts, ...extraProducts]
      .filter((product) => {
        if (existingIds.has(product.id)) return false;
        existingIds.add(product.id);
        return true;
      })
      .slice(0, MAX_PRODUCTS);
  }, [firstPageProducts, extraProducts]);

  const productsSwiperRef = useRef<SwiperType | null>(null);
  const getMobileCategoryLabel = (category: string) => {
    if (category.includes(">")) return category.split(">")[0].trim();

    const acronym = category.match(/^([A-Z]{2,})\s*\(/);
    if (acronym) return acronym[1];

    return category;
  };

  const normalizeForm = (form?: string | null) => form?.trim().toLowerCase();

  const formImageMap: Record<string, StaticImageData> = {
    capsule: CapsuleImage,
    cream: CreamImage,
    injectable: InjectableImage,
    insert: InsertImage,
    "nail polish": NailPolishImage,
    "nasal spray": NasalSprayImage,
    ointment: OintmentImage,
    patch: PatchImage,
    "pre-filled syringe": PrefillesSyringeImage,
    "pre-filles syringe": PrefillesSyringeImage,
    "scalp oil": ScalpOilImage,
    solution: SolutionImage,
    suppository: SuppositoryImage,
    tablet: TabletImage,
    "trichosol solution": TrichosolSolutionImage,
    troche: TrocheImage,
    vial: VialImage,
  };

  const getProductImage = (product: ProductType) => {
    if (product.primaryImage) return product.primaryImage;

    const form = normalizeForm(product.form);
    if (!form) return "";

    return formImageMap[form] || "";
  };

  const router = useRouter();
  const getInDemandBgImage = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("tirzeptatide")) {
      return Images.landingPage.TirzepatideImage;
    }

    if (name.includes("semaglutide")) {
      return Images.landingPage.SemaglutideImage;
    }

    if (name.includes("nad")) {
      return Images.landingPage.NADImage;
    }

    if (name.includes("sildenafil")) {
      return Images.landingPage.sildenafil;
    }

    return Images.landingPage.TestosteroneImage;
  };

  return (
    <>
      <section
        id="page-hero"
        className="pt-33.25 relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0  w-full h-full object-cover z-10"
        >
          <source
            src="https://res.cloudinary.com/dgbdcdqd1/video/upload/q_auto/f_auto/v1778565532/Paramount_hero_video_jnxqcb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-15" />
        <div className="container max-w-7xl mx-auto px-4 2xl:px-8 flex flex-col gap-6  lg:gap-16 relative z-20">
          <div className="flex flex-col gap-2 lg:gap-4">
            <span className="text-[28px] lg:text-[54px] text-white font-semibold leading-[120%] tracking-[-2%]">
              Modern Medicine.
              <br /> Personalized.
              <br /> Delivered.
            </span>
            <span className="text-lg lg:text-[26px] text-white font-light leading-[160%]">
              Peak performance isn&apos;t accidental.
              <br /> It&apos;s engineered.
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5.5">
            <Link
              href={"/products"}
              className="py-3 justify-center cursor-pointer px-4 lg:px-6 flex flex-row gap-2.5 rounded-lg text-base text-neutral-900 font-semibold  bg-white"
            >
              Explore Treatments
            </Link>
            <Link
              href={"/products"}
              className="py-3 px-4 lg:px-6 cursor-pointer  justify-center flex flex-row gap-2.5 rounded-lg text-base text-white font-semibold  bg-black/17 border border-white/50 backdrop-blur-[20px]"
            >
              Start Your Assessment
            </Link>
          </div>
        </div>
      </section>
      <section className="py-8 xl:py-24 overflow-x-hidden">
        <div className="container max-w-7xl mx-auto flex flex-col gap-6 lg:gap-12 px-4 2xl:px-0">
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="text-[28px] lg:text-[48px] font-medium text-neutral-900">
              Comprehensive Health Optimization
            </p>
            <div className="flex flex-row gap-2 lg:gap-2.5 flex-wrap">
              <button
                onClick={() => {
                  setActiveProductFilter("all");
                  setSelectedCategory("");
                  setPage(1);
                  setHasMoreProducts(true);
                }}
                className={`py-2 lg:py-1.5 px-3 lg:px-5.5 cursor-pointer rounded-xl text-sm lg:text-base font-medium text-neutral-900 ${
                  activeProductFilter === "all"
                    ? "bg-secondary text-white"
                    : "bg-white border border-[#E3E3E3]"
                }`}
              >
                All
              </button>

              <button
                onClick={() => {
                  setActiveProductFilter("in_demand");
                  setSelectedCategory("");
                  setPage(1);
                  setHasMoreProducts(true);
                }}
                className={`py-2 lg:py-1.5 flex items-center gap-2 px-2 lg:pr-3 lg:ps-2 cursor-pointer rounded-xl text-sm lg:text-base font-medium text-neutral-900 ${
                  activeProductFilter === "in_demand"
                    ? "bg-secondary text-white"
                    : "bg-white border border-[#E3E3E3]"
                }`}
              >
                <Image src={Images.landingPage.indemand} alt={""} /> In Demand
              </button>

              {productCategories.map((category) => {
                const isSelected =
                  activeProductFilter === "category" &&
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveProductFilter("category");
                      setSelectedCategory(category);
                      setPage(1);
                      setExtraProducts([]);
                      setHasMoreProducts(true);
                    }}
                    className={`py-1 lg:py-1.5 px-1 lg:px-2 lg:pr-3 hover:border-secondary cursor-pointer flex flex-row items-center gap-2.5  rounded-xl text-sm lg:text-base font-medium text-neutral-900 whitespace-nowrap ${
                      isSelected
                        ? "bg-secondary text-white"
                        : "bg-white border border-[#E3E3E3]"
                    }`}
                  >
                    <Image
                      src={getCategoryChipImage(category)}
                      alt={category}
                    />

                    <span className="sm:hidden">
                      {getMobileCategoryLabel(category)}
                    </span>
                    <span className="hidden sm:inline">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            {loading && allProducts.length === 0 && (
              <p className="text-neutral-600 text-center">
                Loading products...
              </p>
            )}

            {appolloError && (
              <p className="text-red-600 text-center">
                Failed to load products.
              </p>
            )}

            {!loading && !appolloError && allProducts.length === 0 && (
              <div className="text-neutral-600 text-center text-center">
                No Product Found
              </div>
            )}

            {allProducts.length > 0 && (
              <Swiper
                onSwiper={(swiper) => {
                  productsSwiperRef.current = swiper;
                }}
                loop={allProducts.length > 1}
                slidesPerView="auto"
                spaceBetween={20}
                grabCursor
                // onSlideChange={(swiper) => {
                //   if (swiper.activeIndex === 6) {
                //     loadMoreProducts();
                //   }
                // }}
                className="!overflow-visible"
              >
                {allProducts.map((product: ProductType) => (
                  <SwiperSlide
                    key={product.id}
                    className=" max-w-72 md:max-w-96 !h-auto"
                  >
                    <div
                      className="h-full flex"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      <HomePageProductCard
                        category={product.category}
                        title={product.name}
                        bgImage={getInDemandBgImage(product.name)}
                        isInDemand={activeProductFilter === "in_demand"}
                        image={getProductImage(product)}
                        tags={[product.strength, product.form].filter(
                          (tag): tag is string => Boolean(tag),
                        )}
                        price={
                          Number(product.retailPrice || product.price) % 1 === 0
                            ? `$${Number(product.retailPrice || product.price)}`
                            : `$${Number(product.retailPrice || product.price).toFixed(2)}`
                        }
                        onAddToCart={() => {
                          dispatch(addProductToCart({ product }));
                          toastAlert("Added to Cart Successfully", true);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {/* {isFetchingMore && (
                  <SwiperSlide className="!w-auto !h-auto">
                    <div className="h-full flex items-center text-neutral-600">
                      Loading more products...
                    </div>
                  </SwiperSlide>
                )} */}
              </Swiper>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => productsSwiperRef.current?.slidePrev()}
              className="lg:w-12.5 w-12 h-12  cursor-pointer lg:h-12.5 rounded-full flex items-center justify-center border border-neutral-300 rotate-180"
            >
              <ArrowRightIcon />
            </button>

            <Link
              href="/products"
              className="p-3.5 lg:p-4 rounded-full text-base font-medium text-neutral-900 flex items-center justify-center border border-neutral-300"
            >
              View All Products
            </Link>

            <button
              onClick={() => productsSwiperRef.current?.slideNext()}
              className="lg:w-12.5  w-12 h-12 cursor-pointer lg:h-12.5 rounded-full flex items-center justify-center border border-neutral-300"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
      <section className="px-4 2xl:px-0 pb-8 lg:pb-24">
        <div className="container max-w-7xl mx-auto flex flex-col gap-4 lg:gap-12">
          <h2 className="text-[28px] lg:text-5xl text-neutral-900 font-medium leading-[120%] tracking-[-2%] ">
            Be Your Best Self
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
            {orderedProductCategories.map((category, index) => (
              <CategoryCard
                key={category}
                title={getCategoryCardTitle(category)}
                bgClassName={getCategoryBgClass(category)}
                // image={getCategoryImage(category)}
                // className={categoryCardClassNames[index]}
                // className={getCategoryCardClassName(index)}
                href={getCategoryHref(category)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100">
        <div className=" relative overflow-hidden bg-no-repeat bg-bottom-left">
          <div className="container max-w-7xl mx-auto px-4 xl:px-8 grid grid-cols-1 lg:grid-cols-2 py-8 lg:py-24 z-40 relative ">
            <div className="space-y-8 lg:space-y-14">
              <div className="space-y-1 lg:space-y-4">
                <h2 className="font-medium tracking-[-2%] lg:leading-[120%] text-[28px] sm:text-4xl  xl:text-[48px] text-neutral-900">
                  This isn&apos;t wellness. This is medicine—done right.
                </h2>
                <p className="text-neutral-700 font-normal text-base  xl:text-xl">
                  Paramount HealthRx was built to deliver integrated,
                  physician-guided optimization—not isolated products.
                </p>
              </div>
              <div className="flex flex-col gap-5 lg:gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-4 gap-x-5">
                  <div className="p-4 lg:p-5  rounded-xl flex items-center gap-3 lg:gap-6 bg-linear-to-b hover:from-gray-100 hover:to-whites hover:shadow from-white to-white/20 cursor-pointer">
                    <div className="flex items-center justify-center relative opacity-100">
                      <Image
                        alt=""
                        src={Images.landingPage.iconBg}
                        className="drop-shadow shrink-0"
                      />
                      <span className="absolute">
                        <SecurityCheckIcon />
                      </span>
                    </div>

                    <h2 className="text-neutral-700 text-base lg:text-lg">
                      Individualized protocols
                    </h2>
                  </div>

                  <div className="p-4 lg:p-5  rounded-xl flex items-center gap-3 lg:gap-6 bg-linear-to-b from-white to-white/20 hover:from-gray-100 hover:to-whites hover:shadow cursor-pointer">
                    <div className="flex items-center justify-center relative opacity-100">
                      <Image
                        alt=""
                        src={Images.landingPage.iconBg}
                        className="drop-shadow shrink-0"
                      />
                      <span className="absolute">
                        <StethoscopeIcon />
                      </span>
                    </div>

                    <h2 className="text-neutral-700 text-base lg:text-lg">
                      Real labs, real doctors
                    </h2>
                  </div>

                  <div className="p-4 lg:p-5  rounded-xl flex items-center gap-3 lg:gap-6 bg-linear-to-b from-white to-white/20 hover:from-gray-100 hover:to-whites hover:shadow cursor-pointer">
                    <div className="flex items-center justify-center relative opacity-100">
                      <Image
                        alt=""
                        src={Images.landingPage.iconBg}
                        className="drop-shadow shrink-0"
                      />
                      <span className="absolute">
                        <MedicineIcon />
                      </span>
                    </div>

                    <h2 className="text-neutral-700 text-base lg:text-lg">
                      Compounded by elite pharmacies
                    </h2>
                  </div>

                  <div className="p-4 lg:p-5  rounded-xl flex items-center gap-3 lg:gap-6 bg-linear-to-b from-white to-white/20 hover:from-gray-100 hover:to-whites hover:shadow cursor-pointer">
                    <div className="flex items-center justify-center relative opacity-100">
                      <Image
                        alt=""
                        src={Images.landingPage.iconBg}
                        className="drop-shadow shrink-0"
                      />
                      <span className="absolute">
                        <PulseIcon />
                      </span>
                    </div>

                    <h2 className="text-neutral-700 text-base lg:text-lg">
                      Continuous monitoring & refinement
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:w-auto gap-2 lg:gap-4">
                  <div className="w-full lg:w-auto">
                    <Link href={"/products"}>
                      <button
                        className="bg-[#104584] cursor-pointer backdrop-blur-[66px] py-3 px-6 rounded-lg w-full lg:w-auto"
                        onClick={() => ""}
                      >
                        <span className="text-white font-semibold text-base ">
                          Explore Treatments
                        </span>
                      </button>
                    </Link>
                  </div>
                  <span className="text-neutral-800 text-base text-center lg:text-start italic">
                    Because average isn&apos;t the goal.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={Images.landingPage.wellnessMockup}
            alt="wellnessMockup"
            className="relative md:absolute bottom-0 end-1 2xl:end-0 z-20 "
          />

          <Image
            src={Images.landingPage.bgCircles}
            alt="wellnessMockup"
            className="absolute hidden lg:block  -bottom-4 animate-spin-dead-slow -end-4 z-10"
          />
        </div>
      </section>
      <section className="py-8 lg:py-24">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 px-4 2xl:px-0">
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col gap-1 lg:gap-2">
              <h2 className="leading-[120%]  tracking-[-2%] font-medium text-[28px] lg:text-5xl text-neutral-900">
                How It Works
              </h2>
              <p className="text-lg lg:text-xl text-neutral-800">
                Simple. Secure. Physician-Guided.
              </p>
            </div>
            <div>
              <Link href={"/products"}>
                <button
                  onClick={() => {
                    "";
                  }}
                  className="cursor-pointer py-3 px-6 border border-black rounded-lg text-black font-semibold text-base"
                >
                  Explore Treatments
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:gap-9.5">
            <div className="flex flex-row gap-4 lg:gap-9.5">
              <Image
                src={Images.landingPage.OnlineAssessmentImage}
                alt={"Online assessment"}
                className="shrink-0 w-20 h-18 rounded-lg lg:rounded-0 object-cover lg:w-auto lg:h-auto"
              />
              <div className="flex flex-col  gap-1 lg:gap-2">
                <p className="text-xl lg:text-[28px] text-black">
                  1. Online Assessment
                </p>
                <p className="text-base lg:text-[20px] text-neutral-600">
                  Answer clinically relevant questions about your health goals
                  and history.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 lg:gap-9.5">
              <Image
                src={Images.landingPage.MedicalReviewImage}
                alt={"Online assessment"}
                className="shrink-0 w-20 h-18 object-cover rounded-lg lg:rounded-0 lg:w-auto lg:h-auto"
              />
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-xl lg:text-[28px] text-black">
                  2. Medical Review
                </p>
                <p className="text-base lg:text-[20px] text-neutral-600">
                  A licensed provider evaluates your data and lab results.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 lg:gap-9.5">
              <Image
                src={Images.landingPage.PersonlizedPlanImage}
                alt={"Online assessment"}
                className="shrink-0 w-20 h-18  object-cover rounded-lg lg:rounded-0 lg:w-auto lg:h-auto"
              />
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-xl lg:text-[28px] text-black">
                  3. Personalized Plan
                </p>
                <p className="text-base lg:text-[20px] text-neutral-600">
                  Receive tailored peptides, hormones, and vitamins designed for
                  you.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 lg:gap-9.5">
              <Image
                src={Images.landingPage.DeliveryandSupportImage}
                alt={"Online assessment"}
                className="shrink-0 w-20 h-18 object-cover rounded-lg lg:rounded-0 lg:w-auto lg:h-auto"
              />
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-xl lg:text-[28px] text-black">
                  4. Delivery & Support
                </p>
                <p className="text-base lg:text-[20px] text-neutral-600">
                  Receive tailored peptides, hormones, and vitamins designed for
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-8 lg:pb-24 lg:block hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className=" w-full h-full object-cover z-10"
        >
          <source
            src="https://res.cloudinary.com/dgbdcdqd1/video/upload/q_auto/f_auto/v1778760507/Paramount_mw5zdn.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="px-4 2xl:px-0">
        <div className="container mx-auto  max-w-7xl">
          <div className=" relative  flex flex-col p-4 xl:p-16 items-center justify-center bg-linear-0 rounded-2xl lg:rounded-4xl overflow-hidden bg-[#EFF4FF]">
            <div className=" flex flex-col lg:flex-row  items-center gap-4 lg:gap-9  w-full relative  mb-5 lg:mb-0">
              <div className="flex-1 flex flex-col items-center lg:items-start gap-2">
                <p className="font-medium text-center lg:text-start leading-[120%] tracking-[-2%] text-[28px] lg:text-[48px] text-neutral-900">
                  Your biology is unique.
                </p>
                <p className="text-lg lg:text-xl text-neutral-800">
                  Your treatment should be too.
                </p>
              </div>
              <div>
                <Link href={"/products"}>
                  <button
                    onClick={() => {
                      "";
                    }}
                    className="border cursor-pointer text-base font-semibold text-black border-black py-3 px-6 rounded-lg"
                  >
                    Start Your Assessment
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative self-stretch -mx-8 w-[calc(100%+64px)] lg:hidden">
              <div className="relative h-75 w-full">
                <Image
                  src={Images.landingPage.BiologyUniqueGroupImage}
                  alt="Biology Unique"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src={Images.landingPage.BiologyUniqueGroupImage}
                alt="Biology Unique"
              />
            </div>

            <div className=" w-full  relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-9 w-full relative ">
                <div className="bg-white p-5 lg:p-7.5 flex-col flex gap-7  rounded-2xl lg:rounded-[30px]">
                  <div className="space-y-2">
                    <h2 className="text-xl lg:text-[28px] font-medium text-black">
                      Peptides
                    </h2>
                    <p className="text-gray-800 text-base lg:text-lg">
                      Advanced compounds designed to accelerate healing, improve
                      body composition, and support longevity.
                    </p>
                  </div>
                  <Link
                    href={"/peptides"}
                    className="bg-neutral-100 w-fit py-3 px-6 rounded-lg text-neutral-800 font-medium text-base "
                  >
                    Learn More
                  </Link>
                </div>

                <div className="bg-white p-5 lg:p-7.5 flex-col flex gap-7 rounded-2xl lg:rounded-[30px]">
                  <div className="space-y-2">
                    <h2 className="text-xl lg:text-[28px] font-medium text-black">
                      Hormones
                    </h2>
                    <p className="text-gray-800 text-base lg:text-lg">
                      Precision-dosed testosterone, estrogen, progesterone, and
                      more—medically supervised.
                    </p>
                  </div>
                  <Link
                    href={"/hormones"}
                    className="bg-neutral-100 lg:absolute lg:bottom-10 w-fit py-3 px-6 rounded-lg text-neutral-800 font-medium text-base"
                  >
                    Learn More
                  </Link>
                </div>

                <div className="bg-white p-5 lg:p-7.5 flex-col flex gap-7 rounded-2xl lg:rounded-[30px]">
                  <div className="space-y-2">
                    <h2 className="text-xl lg:text-[28px] font-medium text-black">
                      Vitamins
                    </h2>
                    <p className="text-gray-800 text-base lg:text-lg">
                      Pharmaceutical-grade micronutrients, not store-bought
                      fillers.
                    </p>
                  </div>
                  <Link
                    href={"/vitamins"}
                    className="bg-neutral-100 lg:absolute lg:bottom-10 w-fit py-3 px-6 rounded-lg  text-neutral-800 font-medium text-base "
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container max-w-7xl mx-auto py-8 lg:py-16 px-4 2xl:px-0 ">
        <div className="bg-[#F5F5F5] rounded-xl p-4 lg:p-13.5 grid grid-cols-1 lg:grid-cols-2 items-center  gap-8 lg:gap-23">
          <div className="flex flex-col gap-4 lg:gap-8.75">
            <p className="text-2xl lg:text-4xl   font-medium text-neutral-900 leading-[130%] tracking-[-2%]">
              Start balancing your
              <br /> hormones with this
              <br /> free guide
            </p>
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4">
              <div className="flex flex-col flex-1 gap-1.5">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-white outline-none py-3 px-5 placeholder:text-[#717680] text-base text-black rounded-xl border border-border-primary"
                />
                <p className="text-sm  text-neutral-800">
                  We care about your data in our{" "}
                  <Link href={""} className="underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
              <div className="w-full lg:w-auto ">
                <button
                  onClick={() => {
                    "";
                  }}
                  className="bg-primary  cursor-pointer py-3 px-8.5 rounded-lg text-base font-semibold text-white w-full lg:w-auto"
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={Images.landingPage.BalancingHormonesImage}
              alt={"Balance Hormones"}
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl lg:pb-16 px-4 xl:px-8">
        <div className="space-y-5 lg:space-y-13.5">
          <h2 className="text-[28px] sm:text-5xl font-medium text-center lg:text-start  text-neutral-900 ">
            Frequent Asked Question?
          </h2>
          <NEWFAQ />
        </div>
      </section>
    </>
  );
}
