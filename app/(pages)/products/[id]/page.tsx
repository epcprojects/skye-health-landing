"use client";
import {
  ProductMetaList,
  QuantityStepper,
  SectionHeroCTA,
} from "@/app/components";
import { Autoplay } from "swiper/modules";
import { Images } from "@/app/images";
import { ChevronIcon, ShoppingCartIcon } from "@/public/icons";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { toastAlert } from "@/app/components/ToastAlert";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { canAddProductWithCartRules } from "@/app/lib/cartRules";
import {
  selectProductById,
  selectRelatedProducts,
} from "@/app/Redux/slices/products/productsSlice";
import { addProductToCart } from "@/app/Redux/slices/cart/cartSlice";
import Link from "next/link";
import { ProductType } from "@/app/graphql/queries/products";
import { StaticImageData } from "next/image";

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
import ProductCard from "@/app/components/ProductCard";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) =>
    state.cart.allIds.map((id) => state.cart.itemsById[id]).filter(Boolean),
  );
  const product = useAppSelector((state) =>
    selectProductById(state, params.id as string),
  );

  const relatedProducts = useAppSelector((state) =>
    selectRelatedProducts(state, params.id),
  );

  console.log("relatedProducts", relatedProducts);

  const [qty, setQty] = useState(1);
  const [selectedPricingId, setSelectedPricingId] = useState<string | null>(
    null,
  );
  const swiperRef2 = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!product) {
      router.replace("/products");
    }
  }, [product, router]);

  useEffect(() => {
    if (!product) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedPricingId(product.productUnitPricings?.[0]?.id ?? null);
  }, [product]);

  if (!product) return null;

  const selectedUnitPricing =
    product.productUnitPricings?.find(
      (pricing) => pricing.id === selectedPricingId,
    ) ?? product.productUnitPricings?.[0];

  const displayPrice =
    selectedUnitPricing?.retailPrice ??
    selectedUnitPricing?.cost ??
    product.retailPrice ??
    product.price;
  const shouldHideHormonePrice =
    product.category?.trim().toLowerCase() === "hormone program";

  const displayStrength = selectedUnitPricing?.strength || product.strength;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dosageOptions = useMemo(
    () => product.productUnitPricings ?? [],
    [product.productUnitPricings],
  );

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

  const getProductImage = (item: ProductType) => {
    if (item.primaryImage) return item.primaryImage;

    const form = normalizeForm(item.form);
    if (!form) return Images.landingPage.product;

    return formImageMap[form] || Images.landingPage.product;
  };

  const extractMg = (strength?: string) => {
    if (!strength) return null;
    const m = strength.match(/(\d+(\.\d+)?)/);
    return m ? Number(m[1]) : null;
  };

  return (
    <>
      <section className="bg-primary pb-12 lg:pb-24 pt-44 lg:pt-59">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center gap-5">
          <h2 className="text-white text-2xl leading-14  md:text-4xl text-center font-semibold">
            {product.name}
          </h2>

          {[product.form, product.strength].length > 0 && (
            <div className="flex items-center justify-center flex-wrap gap-2">
              {[product.form, product.strength].map((tag, index) =>
                tag ? (
                  <span
                    key={index}
                    className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm"
                  >
                    {tag}
                  </span>
                ) : null,
              )}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-4 lg:space-y-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="border border-neutral-200 rounded-xl md:max-h-120 flex items-center justify-center">
            <Image
              alt=""
              src={getProductImage(product)}
              width={340}
              height={476}
            />
          </div>

          <div className="space-y-3 lg:space-y-6">
            <div className="space-y-2.5">
              <h2 className="text-xl wrap-anywhere lg:text-3xl font-semibold text-gunmetal">
                {product.name}
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-gray-900">
                  Availability:
                </span>
                <span
                  className={`
          shrink-0
    text-gunmetal text-base font-semibold
    flex items-center gap-2.5
    before:content-['']
    before:h-2.5 before:w-2.5
    before:rounded-full
    before:inline-block
    ${1 === 1 ? "before:bg-green-600" : "before:bg-red-500"}
  `}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {!shouldHideHormonePrice && (
                <h3 className="text-neutral-900 font-extrabold text-3xl lg:text-4xl">
                  $
                  {Number(displayPrice) % 1 === 0
                    ? Number(displayPrice)
                    : Number(displayPrice).toFixed(2)}
                </h3>
              )}
            </div>

            {dosageOptions.length > 1 && (
              <div className="bg-neutral-100 rounded-[20px] p-4 space-y-3.5">
                <p className="text-xl text-gray-900 font-medium">
                  Select dosage
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {dosageOptions.map((option) => {
                    const optionPrice =
                      option.retailPrice ?? option.cost ?? product.price;
                    const isActive = option.id === selectedUnitPricing?.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedPricingId(option.id)}
                        className={`rounded-xl border  text-left p-3 cursor-pointer transition ${
                          isActive
                            ? " border-primary-light bg-blue-50"
                            : " border-gray-200 hover:bg-white bg-white"
                        }`}
                      >
                        <p className="text-lg mb-3 font-semibold text-neutral-800 break-all">
                          {option.strength || "Option"}
                        </p>
                        <p className="text-base font-semibold text-neutral-800 break-all">
                          {option.unitQuantity}
                        </p>
                        {!shouldHideHormonePrice && (
                          <p className="text-base mt-3 text-gray-700">
                            $
                            {Number(optionPrice) % 1 === 0
                              ? Number(optionPrice)
                              : Number(optionPrice).toFixed(2)}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <ProductMetaList
                items={[
                  { label: "Vendor:", value: product.vendor },
                  {
                    label: "Size",
                    value: selectedUnitPricing?.unitQuantity || displayStrength,
                  },
                  { label: "Strength:", value: displayStrength },
                  { label: "Product Type", value: product.form },
                ]}
              />
            </div>

            <div className="flex sm:flex-row flex-col gap-3 sm:items-end">
              <QuantityStepper value={qty} onChange={setQty} min={1} max={20} />

              <button
                type="button"
                onClick={() => {
                  const cartGuard = canAddProductWithCartRules(
                    cartItems,
                    product.id,
                  );

                  if (!cartGuard.allowed) {
                    toastAlert(
                      cartGuard.message ?? "Unable to add product to cart.",
                      false,
                    );
                    return;
                  }

                  dispatch(
                    addProductToCart({
                      product,
                      qty,
                      selectedPricingId: selectedUnitPricing?.id,
                    }),
                  );
                  toastAlert(`Added ${qty} item(s) to cart`, true);
                }}
                className="rounded-full w-full flex-1 justify-center cursor-pointer hover:bg-primary/90 bg-primary sm:ps-5 p-1.5 sm:p-3 text-white flex items-center gap-3 text-lg sm:text-xl font-medium"
              >
                Learn More
                {/* <ShoppingCartIcon
                  classname="w-4.5 h-4.5 lg:w-6 lg:h-6"
                  fill="currentColor"
                /> */}
              </button>
            </div>
          </div>
        </div>

        {product.description && (
          <div className="space-y-5 lg:space-y-4.5">
            <h2 className="font-extrabold text-2xl lg:text-3xl text-neutral-900">
              About This Product
            </h2>

            <div className="space-y-3 lg:space-y-6">
              <p
                className="text-base lg:text-lg text-neutral-700"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              ></p>
            </div>
          </div>
        )}

        <div className="space-y-4 md:space-y-6">
          <h2 className="font-extrabold text-2xl lg:text-3xl text-neutral-900">
            Customers Also Bought
          </h2>

          <div className="relative ">
            <div className="absolute -left-4 2xl:-left-20 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => swiperRef2.current?.slidePrev()}
                className="bg-white rounded-full w-10 h-10   border border-neutral-200 flex items-center justify-center hover:drop-shadow"
              >
                <ChevronIcon />
              </button>
            </div>

            <div className="absolute -right-4 2xl:-right-20 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => swiperRef2.current?.slideNext()}
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
              {relatedProducts.map((p: ProductType, index) => {
                const mg = extractMg(p.strength);
                const image = getProductImage(p);
                const cardProduct = {
                  id: p.id,
                  title: p.name,
                  category: p.category,
                  stock: p.inStock,
                  price:
                    Number(p.retailPrice ? p.retailPrice : p.price) % 1 === 0
                      ? Number(p.retailPrice ? p.retailPrice : p.price)
                      : Number(p.retailPrice ? p.retailPrice : p.price).toFixed(
                          2,
                        ),
                  image: image || "",
                  size: p.strength,
                  dosing: mg ? `${mg} mg` : "",
                  timing: "",
                  type: p.form,
                  warnings: "",
                };

                return (
                  <SwiperSlide key={index} className="max-w-sm! px-0!">
                    <ProductCard
                      key={p.id}
                      product={cardProduct}
                      onCardClick={(id: string) =>
                        router.push(`/products/${p.id}`)
                      }
                      onAddToCart={() => {
                        const cartGuard = canAddProductWithCartRules(
                          cartItems,
                          p.id,
                        );

                        if (!cartGuard.allowed) {
                          toastAlert(
                            cartGuard.message ??
                              "Unable to add product to cart.",
                            false,
                          );
                          return;
                        }

                        dispatch(addProductToCart({ product: p }));
                        toastAlert("Added to Cart Successfully", true);
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Link
            href={"/products"}
            className="text-neutral-900 font-medium hover:bg-neutral-100 cursor-pointer text-base py-3 px-7.5 rounded-full border-secondary border-2"
          >
            View all products
          </Link>
        </div>
      </section>
    </>
  );
};

export default Page;
