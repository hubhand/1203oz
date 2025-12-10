/**
 * @file app/products/page.tsx
 * @description 상품 목록 페이지
 *
 * 모든 상품을 grid 레이아웃으로 표시하고 카테고리 필터링 기능을 제공합니다.
 */

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getProductsWithPagination,
  type SortOption,
} from "@/lib/supabase/products";
import ProductListPagination from "@/components/ProductListPagination";
import { CATEGORIES } from "@/lib/constants/categories";
import { ArrowUpDown } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

/**
 * 상품 목록 페이지
 * @param searchParams URL 쿼리 파라미터 (category 필터링용)
 */
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const sortParam = params.sort as SortOption | undefined;
  const sortBy: SortOption = sortParam || "newest";

  // 카테고리 필터와 정렬에 따라 상품 조회 (초기 12개)
  const { products, total } = await getProductsWithPagination(
    selectedCategory,
    sortBy,
    12,
    0,
  );

  // 선택된 카테고리 정보
  const selectedCategoryInfo = selectedCategory
    ? CATEGORIES.find((cat) => cat.path === selectedCategory)
    : null;

  // 정렬 옵션
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "최신순" },
    { value: "price_asc", label: "가격 낮은 순" },
  ];

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {selectedCategoryInfo ? selectedCategoryInfo.label : "전체 상품"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedCategoryInfo
              ? `${selectedCategoryInfo.label} 카테고리의 상품입니다.`
              : "모든 상품을 확인해보세요."}
          </p>
        </div>

        {/* 필터 및 정렬 */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={selectedCategory ? `/products?sort=${sortBy}` : `/products`}
            >
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
              >
                전체
              </Button>
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category.path}
                href={`/products?category=${category.path}&sort=${sortBy}`}
              >
                <Button
                  variant={
                    selectedCategory === category.path ? "default" : "outline"
                  }
                  size="sm"
                >
                  {category.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* 정렬 선택 */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              정렬:
            </span>
            {sortOptions.map((option) => {
              const currentUrl = new URL("/products", "http://localhost");
              if (selectedCategory) {
                currentUrl.searchParams.set("category", selectedCategory);
              }
              if (option.value !== "newest") {
                currentUrl.searchParams.set("sort", option.value);
              }

              return (
                <Link
                  key={option.value}
                  href={currentUrl.pathname + currentUrl.search}
                >
                  <Button
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 상품 그리드 */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          }
        >
          {products.length > 0 ? (
            <ProductListPagination
              initialProducts={products}
              total={total}
              category={selectedCategory}
              sortBy={sortBy}
              initialLimit={12}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold mb-2">상품이 없습니다</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedCategoryInfo
                  ? `${selectedCategoryInfo.label} 카테고리에 등록된 상품이 없습니다.`
                  : "등록된 상품이 없습니다."}
              </p>
              {selectedCategory && (
                <Link href="/products">
                  <Button variant="outline">전체 상품 보기</Button>
                </Link>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
