"use client";
import { SectionHeroCTA } from "@/app/components";
import HomePageProductCard from "@/app/components/HomePageProductsCard";
import ProductCard from "@/app/components/ProductCard";
import { toastAlert } from "@/app/components/ToastAlert";
import {
  ALL_PRODUCTS,
  AllProductsType,
  AllProductsVariables,
  FETCH_CATEGORIES,
  ProductType,
} from "@/app/graphql/queries/products";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Images } from "@/app/images";
import { addProductToCart } from "@/app/Redux/slices/cart/cartSlice";
import { setProducts } from "@/app/Redux/slices/products/productsSlice";
import { useAppDispatch } from "@/app/Redux/store";
import { CrossIcon, SearchIcon } from "@/public/icons";
import { useQuery } from "@apollo/client/react";
import Image, { StaticImageData } from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

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

const PER_PAGE = 12;

const Page = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [activeProductFilter, setActiveProductFilter] = useState<
    "in_demand" | "all" | "category"
  >("in_demand");

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    loading,
    error: appolloError,
    fetchMore,
  } = useQuery<AllProductsType, AllProductsVariables>(ALL_PRODUCTS, {
    variables: {
      search: debouncedSearch || undefined,
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
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setActiveProductFilter("category");
    }
  }, [categoryFromUrl]);

  const { data: categoriesData } = useQuery<{ productCategories: string[] }>(
    FETCH_CATEGORIES,
    { skip: loading || !!appolloError },
  );

  const extractMg = (strength?: string) => {
    if (!strength) return null;
    const m = strength.match(/(\d+(\.\d+)?)/);
    return m ? Number(m[1]) : null;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
    setHasMoreProducts(true);
  }, [debouncedSearch, selectedCategory, activeProductFilter]);

  // Set first page data
  useEffect(() => {
    const firstPageProducts = data?.allProducts?.allData ?? [];
    if (page === 1) {
      setAllProducts(firstPageProducts);
      setHasMoreProducts(firstPageProducts.length === PER_PAGE);
    }
  }, [data?.allProducts?.allData, page]);

  // Sync to Redux
  useEffect(() => {
    dispatch(setProducts(allProducts));
  }, [allProducts, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMoreProducts = async () => {
    if (loading || isFetchingMore || !hasMoreProducts) return;

    try {
      setIsFetchingMore(true);

      const nextPage = page + 1;

      const result = await fetchMore({
        variables: {
          search: debouncedSearch || undefined,
          category:
            activeProductFilter === "category"
              ? selectedCategory || undefined
              : undefined,
          in_demand: activeProductFilter === "in_demand" ? true : undefined,
          page: nextPage,
          perPage: PER_PAGE,
        },
      });

      const newProducts = result.data?.allProducts?.allData ?? [];

      if (newProducts.length > 0) {
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const filteredNew = newProducts.filter(
            (item: { id: string }) => !existingIds.has(item.id),
          );
          return [...prev, ...filteredNew];
        });

        setPage(nextPage);
      }

      if (newProducts.length < PER_PAGE) {
        setHasMoreProducts(false);
      }
    } catch (error) {
      console.error("Failed to fetch more products:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [loadMoreProducts]);

  const productCategories: string[] = categoriesData?.productCategories ?? [];
  const [showMore, setShowMore] = useState(false);

  const CATEGORY_LIMIT = isMobile ? 10 : 20;

  const visibleCategories = showMore
    ? productCategories
    : productCategories.slice(0, CATEGORY_LIMIT);

  const hasMore = productCategories.length > CATEGORY_LIMIT;

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

  // const formImageMap: Record<string, unknown> = {
  //   "capsule": Images.landingPage.CapsuleImage,
  //   "cream": Images.landingPage.CreamImage,
  //   "injectable": Images.landingPage.InjectableImage,
  //   "insert": Images.landingPage.InsertImage,
  //   "nail polish": Images.landingPage.NailPolishImage,
  //   "nasal spray": Images.landingPage.NasalSprayImage,
  //   "ointment": Images.landingPage.OintmentImage,
  //   "patch": Images.landingPage.PatchImage,
  //   "pre-filled syringe":Images.landingPage.PrefillesSyringeImage,
  //   "pre-filles syringe": Images.landingPage.PrefillesSyringeImage,
  //   "scalp oil": Images.landingPage.ScalpOilImage,
  //   "solution": Images.landingPage.SolutionImage,
  //   "suppository": Images.landingPage.SuppositoryImage,
  //   "tablet": Images.landingPage.TabletImage,
  //   "trichosol solution": Images.landingPage.TrichosolSolutionImage,
  //   "troche": Images.landingPage.TrocheImage,
  //   "vial": Images.landingPage.VialImage,
  // };

  const getProductImage = (product: ProductType) => {
    if (product.primaryImage) return product.primaryImage;

    const form = normalizeForm(product.form);
    if (!form) return "";

    return formImageMap[form] || "";
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

  const getMobileCategoryLabel = (category: string) => {
    if (category.includes(">")) return category.split(">")[0].trim();

    const acronym = category.match(/^([A-Z]{2,})\s*\(/);
    if (acronym) return acronym[1];

    return category;
  };

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
      <SectionHeroCTA
        title="Products"
        titleSize="xl:text-6xl sm:text-5xl text-4xl"
        description="Peak performance isn't accidental. It's engineered."
      />

      <section className="container mx-auto space-y-5 lg:space-y-9 max-w-7xl py-6 xl:py-16 px-4 xl:px-8">
        <h2 className="text-neutral-900 font-bold text-2xl lg:text-3xl">
          All Products
        </h2>

        <div className="flex flex-wrap items-center gap-3 lg:gap-6">
          <div className="flex items-center flex-1 relative">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
              placeholder="Search (name or SKU)  e.g. Tesamorelin, PP-2XB..."
              className="py-3 ps-10 px-4 rounded-full placeholder:text-neutral-500 w-full font-medium text-sm sm:text-base border-2 border-neutral-200 focus:ring outline-0 focus:ring-neutral-200"
            />
            <span className="absolute left-3">
              <SearchIcon />
            </span>

            {searchQuery.trim().length !== 0 && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <CrossIcon />
              </button>
            )}
          </div>
        </div>

        {appolloError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            Failed to load products. {appolloError.message}
          </div>
        )}

        {productCategories.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 overflow-hidden">
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
                      // setExtraProducts([]);
                      setHasMoreProducts(true);
                    }}
                    className={`py-1 lg:py-1.5 px-1 lg:px-2 lg:pr-3 hover:border-secondary cursor-pointer  flex flex-row items-center gap-2.5  rounded-xl text-sm lg:text-base font-medium text-neutral-900 whitespace-nowrap ${
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

            {hasMore && (
              <button
                className="text-secondary hover:underline underline-offset-2 cursor-pointer"
                onClick={() => setShowMore((v) => !v)}
              >
                Show {showMore ? "Less" : "More"}
                {!showMore
                  ? ` (+${productCategories.length - CATEGORY_LIMIT})`
                  : ""}
              </button>
            )}
          </div>
        )}

        {loading && allProducts.length === 0 && (
          <div className="text-neutral-600 text-center">Loading products…</div>
        )}

        {!loading && !appolloError && allProducts.length === 0 && (
          <div className="text-neutral-600 text-center">No Product Found</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {allProducts.map((p: ProductType) => {
            const mg = extractMg(p.strength);

            const cardProduct = {
              id: p.id,
              title: p.name,
              category: p.category,
              stock: p.status === "IN_STOCK",
              price:
                Number(p.retailPrice ? p.retailPrice : p.price) % 1 === 0
                  ? Number(p.retailPrice ? p.retailPrice : p.price)
                  : Number(p.retailPrice ? p.retailPrice : p.price).toFixed(2),
              image: p.primaryImage || "",
              size: p.strength,
              dosing: mg ? `${mg} mg` : "",
              timing: "",
              type: p.form,
              warnings: "",
            };

            return (
              <div
                key={p.id}
                onClick={() => router.push(`/products/${p.id}`)}
                className="cursor-pointer"
              >
                <HomePageProductCard
                  category={p.category}
                  title={p.name}
                  image={getProductImage(p)}
                  bgImage={getInDemandBgImage(p.name)}
                  isInDemand={activeProductFilter === "in_demand"}
                  // image={p.primaryImage || ""}
                  tags={[p.strength, p.form].filter((tag): tag is string =>
                    Boolean(tag),
                  )}
                  price={
                    Number(p.retailPrice || p.price) % 1 === 0
                      ? `$${Number(p.retailPrice || p.price)}`
                      : `$${Number(p.retailPrice || p.price).toFixed(2)}`
                  }
                  onAddToCart={() => {
                    dispatch(addProductToCart({ product: p }));
                    toastAlert("Added to Cart Successfully", true);
                  }}
                />
              </div>

              // <ProductCard
              //   key={p.id}
              //   product={cardProduct}
              //   onCardClick={(id: string) => router.push(`/products/${id}`)}
              //   onAddToCart={() => {
              //     dispatch(addProductToCart({ product: p }));
              //     toastAlert("Added to Cart Successfully", true);
              //   }}
              // />
            );
          })}
        </div>

        {/* Sentinel */}
        <div
          ref={loadMoreRef}
          className="h-10 flex items-center justify-center"
        >
          {isFetchingMore && (
            <span className="text-neutral-600">Loading more products…</span>
          )}
          {!hasMoreProducts && allProducts.length > 0 && (
            <span className="text-neutral-500">No more products</span>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
