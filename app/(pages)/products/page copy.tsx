"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { SectionHeroCTA } from "@/app/components";
import HormonesCard from "@/app/components/HormonesCard";
import ProductCard from "@/app/components/ProductCard";
import { toastAlert } from "@/app/components/ToastAlert";
import { CrossIcon, SearchIcon } from "@/public/icons";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import {
  clearProducts,
  replaceProducts,
  selectAllProducts,
  selectTotalCategoryCount,
} from "@/app/Redux/slices/products/productsSlice";
import {
  fetchParamountCategories,
  fetchParamountProducts,
} from "@/app/Redux/slices/products/productsThunks";
import { addProductToCart } from "@/app/Redux/slices/cart/cartSlice";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useQuery } from "@apollo/client/react";
import { ALL_PRODUCTS } from "@/app/graphql/queries/products";

/** --- helpers to map API product -> your ProductCard shape --- */
const extractMg = (strength?: string) => {
  if (!strength) return null;
  const m = strength.match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
};

const Page = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  // UI state
  // const [dosage, setDosage] = useState(5);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // pagination state
  const [page, setPage] = useState(1);
  const limit = 12;

  // redux state
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector((s) => s.products.status);
  const totalPages = useAppSelector((s) => s.products.totalPages ?? 1);
  const totalProducts = useAppSelector((s) => s.products.total);
  const categories = useAppSelector((s) => s.products.categories);
  const totalCategoryProducts = useAppSelector(selectTotalCategoryCount);
  const error = useAppSelector((s) => s.products.error);
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const CATEGORY_LIMIT = isMobile ? 10 : 20;

  const visibleCategories = showMore
    ? categories
    : categories.slice(0, CATEGORY_LIMIT);

  const hasMore = categories.length > CATEGORY_LIMIT;

  // Initial fetch
  useEffect(() => {
    // first page
    dispatch(fetchParamountCategories({}));
    dispatch(
      fetchParamountProducts({ page: 1, limit, filter: selectedCategory }),
    );
  }, [dispatch, selectedCategory]);

  const isLoading = status === "loading";
  const canLoadMore = page < totalPages && !isLoading;

  // Dynamic category counts (based on API categories)
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      for (const c of p.category ?? []) {
        map.set(c, (map.get(c) ?? 0) + 1);
      }
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [products]);

  // Filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((p) => {
      // 1. Basic Active Check
      // if (!p.isActive) return false;

      // 2. Search Logic (Name or Description)
      // const haystack = `${p.name} ${p.description}`.toLowerCase();
      // if (q && !haystack.includes(q)) return false;

      // 3. Category Filter (Normalized)
      // if (selectedCategory && search.trim().length === 0) {
      //   // Ensure p.categories exists and normalize every tag for comparison
      //   const normalizedProductCats = (p.category || []).map((cat) => cat);

      //   const normalizedSelected = selectedCategory;

      //   if (!normalizedProductCats.includes(normalizedSelected)) {
      //     return false;
      //   }
      // }

      return true;
    });
  }, [products, search, selectedCategory]);

  const handleLoadMore = async () => {
    if (!canLoadMore) return;
    const next = page + 1;
    setPage(next);
    dispatch(
      fetchParamountProducts({ page: next, limit, filter: selectedCategory }),
    );
  };

  useEffect(() => {
    const trimmed = search.trim();

    // If search is cleared
    if (trimmed.length === 0) {
      dispatch(clearProducts());
      dispatch(
        fetchParamountProducts({ page: 1, limit, filter: selectedCategory }),
      );
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      if (trimmed.length < 2) return;
      // setSelectedCategory("");
      const res = await fetch(
        `/api/paramount/products/search?q=${encodeURIComponent(trimmed)}`,
        { signal: controller.signal },
      );

      const data = await res.json();

      dispatch(replaceProducts(data));
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [search]);

  const {
    data,
    loading,
    error: appolloError,
  } = useQuery(ALL_PRODUCTS, {
    variables: {
      vendor: "Alpha BioMed",
      page: 1,
      perPage: 20,
    },
  });

  console.log("data", data);

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

        {/* Search + dosage */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-6">
          <div className="flex items-center flex-1 relative">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedCategory("");
              }}
              type="text"
              placeholder="Search (name or SKU)  e.g. Tesamorelin, PP-2XB..."
              className="py-3 ps-10 px-4 rounded-full placeholder:text-neutral-500 w-full font-medium text-sm sm:text-base border-2 border-neutral-200 focus:ring outline-0 focus:ring-neutral-200"
            />
            <span className="absolute left-3">
              <SearchIcon />
            </span>

            {search.trim().length !== 0 && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <CrossIcon />
              </button>
            )}
          </div>

          {/* <div className="sm:max-w-md w-full">
            <DosageSlider
              value={dosage}
              onValueChange={setDosage}
              min={0}
              max={100}
              step={5}
              unit="mg"
            />
          </div> */}
        </div>

        {/* Category pills (dynamic) */}
        {categories.length > 0 && (
          <div className="space-y-2">
            <div className={`flex flex-wrap gap-2  overflow-hidden`}>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSearch("");
                }}
                className={`py-1 md:py-1.5 text-sm px-3 cursor-pointer rounded-full drop-shadow-xs hover:drop-shadow-sm flex items-center gap-2 border  ${
                  selectedCategory === ""
                    ? "bg-primary-light text-neutral-800 border-secondary"
                    : "bg-neutral-100 border-neutral-100"
                }`}
              >
                All
                <span
                  className={`flex items-center justify-center h-5.5 px-1 border-neutral-200 rounded-full border text-xs ${
                    selectedCategory === ""
                      ? "bg-white"
                      : "bg-white  text-neutral-500"
                  }`}
                >
                  {totalProducts ?? products.length}
                  {/* {totalCategoryProducts} */}
                </span>
              </button>

              {visibleCategories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCategory((prev) =>
                      prev === c.name ? "" : c.name,
                    );
                    setSearch("");
                  }}
                  className={`py-1 md:py-1.5 text-sm px-3  cursor-pointer rounded-full drop-shadow-xs hover:drop-shadow-sm flex items-center gap-2 border ${
                    selectedCategory === c.name
                      ? "bg-primary-light text-neutral-800 border-secondary"
                      : "bg-neutral-100 border-neutral-100"
                  }`}
                >
                  {c.name}
                  <span
                    className={`flex items-center justify-center h-5.5 px-1 border-neutral-200 rounded-full border text-xs ${
                      selectedCategory === c.name
                        ? "bg-white"
                        : "bg-white text-neutral-500"
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
            {hasMore && (
              <button
                className="text-secondary hover:underline underline-offset-2 cursor-pointer"
                onClick={() => setShowMore((v) => !v)}
              >
                Show {showMore ? "Less" : "More"}
                {!showMore ? ` (+${categories.length - CATEGORY_LIMIT})` : ""}
              </button>
            )}
          </div>
        )}

        {/* States */}
        {status === "failed" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            Failed to load products. {error}
          </div>
        )}

        {loading && products.length === 0 && (
          <div className="text-neutral-600">Loading products…</div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const mg = extractMg(p.strength);

            const cardProduct = {
              id: p.id.toString(),
              title: p.name,
              category: p.form,
              stock: p.inStock,
              price:
                Number(p.price) % 1 === 0
                  ? Number(p.price)
                  : Number(p.price).toFixed(2),
              image: p.primaryImage || "",
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
                onCardClick={(id: string) => router.push(`/products/${id}`)}
                onAddToCart={() => {
                  dispatch(addProductToCart({ product: p }));
                  toastAlert("Added to Cart Successfully", true);
                }}
              />
            );
          })}
        </div>

        {/* Empty */}
        {status !== "loading" && filtered.length === 0 && (
          <div className="text-neutral-600 py-6 w-full text-center">
            No products found for your filters.
          </div>
        )}

        {/* Load more */}
        {search.trim().length === 0 && (
          <div className="flex items-center justify-center">
            <button
              disabled={!canLoadMore}
              onClick={handleLoadMore}
              className="text-neutral-900 font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base py-3 px-7.5 rounded-full border-secondary border-2"
            >
              {canLoadMore ? "Load more products" : "No more products"}
            </button>
          </div>
        )}
      </section>

      <section className="py-8 xl:py-16">
        <HormonesCard />
      </section>
    </>
  );
};

export default Page;
