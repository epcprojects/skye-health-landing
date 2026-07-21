"use client";
import { SectionHeroCTA } from "@/app/components";
import ProductCard from "@/app/components/ProductCard";
import WeightLossProgramModal from "@/app/components/modals/WeightLossProgramModal";
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
import { addProductToCart, setQty } from "@/app/Redux/slices/cart/cartSlice";
import { setProducts } from "@/app/Redux/slices/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { canAddProductWithCartRules } from "@/app/lib/cartRules";
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
const WEIGHT_LOSS_PROGRAM_STORAGE_KEY = "skye-weight-loss-program";

const normalizeText = (value?: string | null) => value?.trim().toLowerCase();

const isWeightLossModalProduct = (product?: ProductType | null) =>
  normalizeText(product?.category) === "weight loss program" ||
  (normalizeText(product?.category) === "weight loss" &&
    normalizeText(product?.subCategory) === "glp-1");

const getWeightLossProgramMonths = () => {
  if (typeof window === "undefined") return 1;

  try {
    const rawSavedProgram = window.localStorage.getItem(
      WEIGHT_LOSS_PROGRAM_STORAGE_KEY,
    );

    if (!rawSavedProgram) return 1;

    const parsedSavedProgram = JSON.parse(rawSavedProgram) as {
      answers?: Array<{ question: string; answer: string }>;
    };
    const monthsAnswer = parsedSavedProgram.answers?.find(
      (entry) => entry.question === "How many months?",
    )?.answer;
    const parsedMonths = Number.parseInt(monthsAnswer ?? "1", 10);

    return Number.isFinite(parsedMonths) && parsedMonths > 0 ? parsedMonths : 1;
  } catch {
    return 1;
  }
};

const Page = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) =>
    state.cart.allIds.map((id) => state.cart.itemsById[id]).filter(Boolean),
  );
  const isMobile = useIsMobile();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [activeProductFilter, setActiveProductFilter] = useState<
    "in_demand" | "all" | "category"
  >("in_demand");
  const [isWeightLossModalOpen, setIsWeightLossModalOpen] = useState(false);
  const [pendingWeightLossProduct, setPendingWeightLossProduct] =
    useState<ProductType | null>(null);
  const [pendingWeightLossPricingId, setPendingWeightLossPricingId] = useState<
    string | undefined
  >(undefined);

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
  const normalizedCategoryFromUrl = categoryFromUrl?.trim();
  const isAllCategoryFromUrl =
    normalizedCategoryFromUrl?.toLowerCase() === "all";

  useEffect(() => {
    if (!normalizedCategoryFromUrl) return;

    if (isAllCategoryFromUrl) {
      setSelectedCategory("");
      setActiveProductFilter("all");
      return;
    }

    setSelectedCategory(normalizedCategoryFromUrl);
    setActiveProductFilter("category");
  }, [isAllCategoryFromUrl, normalizedCategoryFromUrl]);

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
  }, [debouncedSearch, selectedCategory]);

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
          category: selectedCategory || undefined,
          page: nextPage,
          perPage: PER_PAGE,
        },
      });

      const newProducts = result.data?.allProducts?.allData ?? [];

      if (newProducts.length > 0) {
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const filteredNew = newProducts.filter(
            (item) => !existingIds.has(item.id),
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

  const getProductImage = (product: ProductType) => {
    if (product.primaryImage) return product.primaryImage;

    const form = normalizeForm(product.form);
    if (!form) return "";

    return formImageMap[form] || "";
  };

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

  const handleWeightLossProductQuestionnaireStart = () => {
    if (!pendingWeightLossProduct) return;

    const selectedMonths = getWeightLossProgramMonths();
    const existingCartItem = cartItems.find(
      (item) =>
        item.productId === pendingWeightLossProduct.id &&
        (item.selectedPricingId ?? "") === (pendingWeightLossPricingId ?? ""),
    );

    if (!existingCartItem) {
      dispatch(
        addProductToCart({
          product: pendingWeightLossProduct,
          qty: selectedMonths,
          selectedPricingId: pendingWeightLossPricingId,
        }),
      );
    } else {
      dispatch(
        setQty({
          cartItemId: existingCartItem.cartItemId,
          qty: selectedMonths,
        }),
      );
    }

    setIsWeightLossModalOpen(false);
    setPendingWeightLossProduct(null);
    setPendingWeightLossPricingId(undefined);
    router.push("/surveys?step=1");
  };

  return (
    <>
      <WeightLossProgramModal
        isOpen={isWeightLossModalOpen}
        onClose={() => {
          setIsWeightLossModalOpen(false);
          setPendingWeightLossProduct(null);
          setPendingWeightLossPricingId(undefined);
        }}
        onStartQuestionnaire={handleWeightLossProductQuestionnaireStart}
      />
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
              placeholder="Search (name or SKU)"
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
                }}
                className={`py-2 lg:py-1.5 px-3 lg:px-5.5 cursor-pointer rounded-xl hover:border-primary-light text-sm lg:text-base font-medium text-neutral-900 ${
                  activeProductFilter === "all"
                    ? "bg-primary-light text-white"
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
                className={`py-2 lg:py-1.5 flex items-center gap-2 px-2 lg:pr-3 lg:ps-2 hover:border-primary-light cursor-pointer rounded-xl text-sm lg:text-base font-medium text-neutral-900 ${
                  activeProductFilter === "in_demand"
                    ? "bg-primary-light text-white"
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
                    }}
                    className={`py-1 lg:py-1.5 px-1 lg:px-2 lg:pr-3 hover:border-primary-light cursor-pointer flex flex-row items-center gap-2.5  rounded-xl text-sm lg:text-base font-medium text-neutral-900 whitespace-nowrap ${
                      isSelected
                        ? "bg-primary-light text-white"
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
            const image = getProductImage(p);
            const cardProduct = {
              id: p.id,
              title: p.name,
              category: p.category,
              stock: p.inStock,
              price:
                Number( p.price) % 1 === 0
                  ? Number( p.price)
                  : Number(p.price).toFixed(2),
              image: image || "",
              size: p.strength,
              dosing: mg ? `${mg} mg` : "",
              timing: "",
              type: p.form,
              warnings: "",
            };

            return (
              <ProductCard
                key={p.id}
                product={cardProduct}
                productUnitPricings={p.productUnitPricings}
                onCardClick={(id: string) => router.push(`/products/${id}`)}
                onAddToCart={(selectedPricingId) => {
                  const cartGuard = canAddProductWithCartRules(cartItems, p.id);

                  if (!cartGuard.allowed) {
                    toastAlert(
                      cartGuard.message ?? "Unable to add product to cart.",
                      false,
                    );
                    return;
                  }

                  if (isWeightLossModalProduct(p)) {
                    setPendingWeightLossProduct(p);
                    setPendingWeightLossPricingId(selectedPricingId);
                    setIsWeightLossModalOpen(true);
                    return;
                  }

                  dispatch(addProductToCart({ product: p, selectedPricingId }));
                  toastAlert("Added to Cart Successfully", true);
                }}
              />
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
