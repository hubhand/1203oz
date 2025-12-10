/**
 * @file app/products/[id]/page.tsx
 * @description 상품 상세 페이지
 *
 * 개별 상품의 상세 정보를 표시하는 페이지입니다.
 * 재고, 가격, 설명 등 상품의 모든 정보를 보여줍니다.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/supabase/products";
import { getCategoryByDbValue } from "@/lib/constants/categories";
import { ArrowLeft, ShoppingCart } from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 상품 상세 페이지
 * @param params URL 파라미터 (상품 ID)
 */
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // 상품이 없거나 비활성화된 경우 404
  if (!product) {
    notFound();
  }

  // 가격 포맷팅
  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product.price);

  // 재고 상태
  const isInStock = product.stock_quantity > 0;
  const stockStatus =
    product.stock_quantity === 0
      ? "품절"
      : product.stock_quantity < 10
      ? "재고 부족"
      : null;

  // 카테고리 정보
  const categoryInfo = product.category
    ? getCategoryByDbValue(product.category)
    : null;

  // 카테고리 이모지
  const getCategoryEmoji = (category: string | null): string => {
    switch (category) {
      case "shower":
        return "🚿";
      case "bath":
        return "🛁";
      case "sink":
        return "💧";
      case "accessories":
        return "📦";
      default:
        return "🛍️";
    }
  };

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            홈
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            상품 목록
          </Link>
          {categoryInfo && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${categoryInfo.path}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {categoryInfo.label}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">
            {product.name}
          </span>
        </nav>

        {/* 뒤로가기 버튼 */}
        <Link href="/products">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            상품 목록으로
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 상품 이미지 영역 */}
          <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 min-h-[400px]">
            <div className="text-9xl">{getCategoryEmoji(product.category)}</div>
          </div>

          {/* 상품 정보 영역 */}
          <div className="flex flex-col">
            {/* 재고 상태 배지 */}
            {stockStatus && (
              <span
                className={`inline-block text-sm font-semibold px-4 py-2 rounded-full mb-4 w-fit ${
                  product.stock_quantity === 0
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                }`}
              >
                {stockStatus}
              </span>
            )}

            {/* 카테고리 */}
            {categoryInfo && (
              <Link
                href={`/products?category=${categoryInfo.path}`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2 w-fit"
              >
                {categoryInfo.label}
              </Link>
            )}

            {/* 상품명 */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {product.name}
            </h1>

            {/* 가격 */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {formattedPrice}
              </span>
            </div>

            {/* 재고 정보 */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                재고 상태
              </p>
              <p className="text-lg font-semibold">
                {isInStock ? (
                  <span className="text-green-600 dark:text-green-400">
                    재고 있음 ({product.stock_quantity}개)
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">품절</span>
                )}
              </p>
            </div>

            {/* 상품 설명 */}
            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">상품 설명</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* 장바구니 담기 버튼 */}
            <div className="mt-auto pt-6">
              <Button
                size="lg"
                className="w-full text-lg py-6"
                disabled={!isInStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInStock ? "장바구니에 담기" : "품절"}
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                * 장바구니 기능은 Phase 3에서 구현 예정입니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
