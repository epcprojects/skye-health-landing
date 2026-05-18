"use client";

import ThemeButton from "@/app/components/Button/ThemeButton";
import ProductsDataCard from "@/app/components/cards/ProductsDataCard";
import { productsdata } from "@/app/constants/constants";
import { CrossIcon, SearchFieldIcon } from "@/public/icons";
import { useState } from "react";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { id: "peptide-therapy", name: "Peptide Therapy", count: 6 },
    { id: "hormones", name: "Hormones", count: 6 },
    { id: "longevity", name: "Longevity", count: 6 },
    { id: "sleep", name: "Sleep", count: 6 },
    { id: "hair-regrowth", name: "Hair Regrowth", count: 6 },
    { id: "weight-loss", name: "Weight Loss", count: 6 },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  return (
    <>
      <section className="bg-primary pb-12 lg:pb-24 pt-44 lg:pt-59">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center gap-5">
          <h2 className="text-white text-4xl text-center lg:text-start lg:text-[68px] font-semibold">
            Discover Our Products
          </h2>
          <p className="text-lg text-center lg:text-start lg:text-2xl text-white">
            Peak performance isn&apos;t accidental. It&apos;s engineered.
          </p>
        </div>
      </section>
      <section className="py-6 lg:py-16">
        <div className="flex flex-col items-center gap-14.5">
          <div className="container max-w-7xl mx-auto px-4 lg:px-8 flex flex-col gap-9">
            <p className="text-[34px] font-semibold text-black">All Products</p>
            <div className="relative w-full  h-14 rounded-full border border-neutral-300 bg-white/5 pt-3.5 pr-5.75 pb-3 pl-5.25 backdrop-blur-[20px] flex flex-row items-center gap-2.25">
              <SearchFieldIcon />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search (name or SKU)  e.g. Tesamorelin, PP-2XB..."
                className="w-full text-base text-black outline-none placeholder:text-neutral-600"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black"
                  aria-label="Clear search"
                >
                  <CrossIcon />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={[
                      "flex items-center lg:h-14.25 gap-3 px-2 py-2 lg:py-4 lg:px-6.5 rounded-full border text-neutral-900  text-lg font-medium transition-colors",
                      isActive
                        ? "border-transparent bg-[#F3F4F6] "
                        : "border-[#E3E3E3] bg-white ",
                    ].join(" ")}
                  >
                    <span>{category.name}</span>

                    <span
                      className={[
                        "w-5.5 h-5.5 flex text-xs font-medium  rounded-full text-neutral-700 items-center justify-center",
                        isActive ? "bg-white" : "bg-[#E3E3E3] ",
                      ].join(" ")}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {productsdata.map((product) => (
                <ProductsDataCard
                  key={product.id}
                  stockStatus={product.stockStatus}
                  image={product.image}
                  name={product.name}
                  info={product.info}
                  tags={product.tags}
                  price={product.price}
                  onAddToCart={() => {
                    console.log("Add to cart", product.id);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <ThemeButton
              onClick={() => {
                "";
              }}
              size="xl"
              variant="primaryFilled"
              label={"Load more products"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
