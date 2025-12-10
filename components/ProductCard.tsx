/**
 * @file components/ProductCard.tsx
 * @description 상품 카드 컴포넌트
 *
 * 상품 정보를 카드 형태로 표시하는 재사용 가능한 컴포넌트
 */

import Link from "next/link";
import type { Product } from "@/types/product";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

/**
 * 상품 카드 컴포넌트
 * @param product 상품 정보
 */
export default function ProductCard({ product }: ProductCardProps) {
  // 가격 포맷팅 (천 단위 구분)
  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product.price);

  // 재고 상태 확인
  const isInStock = product.stock_quantity > 0;
  const stockStatus =
    product.stock_quantity === 0
      ? "품절"
      : product.stock_quantity < 10
        ? "재고 부족"
        : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
        {/* 배지 (재고 상태) */}
        {stockStatus && (
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
              product.stock_quantity === 0
                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
            }`}
          >
            {stockStatus}
          </span>
        )}

        {/* 상품 이미지 (임시로 이모지 사용) */}
        <div className="text-6xl mb-4 text-center min-h-[80px] flex items-center justify-center">
          {getCategoryEmoji(product.category)}
        </div>

        {/* 상품명 */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* 상품 설명 */}
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}

        {/* 가격 */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formattedPrice}
            </span>
          </div>

          {/* 재고 정보 */}
          {isInStock && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              재고: {product.stock_quantity}개
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/**
 * 카테고리에 따른 이모지 반환
 * @param category 카테고리 값
 * @returns 이모지 문자열
 */
function getCategoryEmoji(category: string | null): string {
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
}

