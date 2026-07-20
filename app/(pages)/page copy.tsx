"use client";
import { ArrowRightIcon } from "@/public/icons";
import Image, { StaticImageData } from "next/image";
import { Images } from "../images";
import Link from "next/link";
import { useState, useRef, useMemo } from "react";
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
import { useRouter } from "next/navigation";

const PER_PAGE = 20;
const MAX_PRODUCTS = 20;
export default function Home() {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [activeProductFilter, setActiveProductFilter] = useState<
    "in_demand" | "all" | "category"
  >("in_demand");
  const [extraProducts, setExtraProducts] = useState<ProductType[]>([]);

  const {
    data,
    loading,
    error: appolloError,
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
        <div className="container max-w-7xl mx-auto flex flex-col gap-6 lg:gap-12 px-4 2xl:px-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="text-[28px] lg:text-[48px] font-medium text-neutral-900">
              Comprehensive Health Optimization
            </p>
            <div className="flex flex-row gap-2 lg:gap-2.5 flex-wrap">
              <button
                onClick={() => {
                  setActiveProductFilter("all");
                  setSelectedCategory("");
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
                      setExtraProducts([]);
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
                          Number(product.price) % 1 === 0
                            ? `$${Number( product.price)}`
                            : `$${Number(product.price).toFixed(2)}`
                        }
                        onAddToCart={() => {
                          dispatch(addProductToCart({ product }));
                          toastAlert("Added to Cart Successfully", true);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
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
      <section className="px-4 2xl:px-8 pb-8 lg:pb-24">
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
    </>
  );
}
