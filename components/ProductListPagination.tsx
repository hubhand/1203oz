/**
 * @file components/ProductListPagination.tsx
 * @description 상품 목록 페이지네이션 컴포넌트
 *
 * "더 보기" 버튼을 통해 추가 상품을 로드하는 Client Component
 */

"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { ChevronDown, Loader2 } from "lucide-react";

interface ProductListPaginationProps {
  initialProducts: Product[];
  total: number;
  category?: string;
  sortBy: string;
  initialLimit: number;
}

/**
 * 상품 목록 페이지네이션 컴포넌트
 * @param initialProducts 초기 로드된 상품 목록
 * @param total 총 상품 개수
 * @param category 선택된 카테고리 (선택)
 * @param sortBy 정렬 옵션
 * @param initialLimit 초기 로드 개수
 */
export default function ProductListPagination({
  initialProducts,
  total,
  category,
  sortBy,
  initialLimit,
}: ProductListPaginationProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [limit, setLimit] = useState(initialLimit);
  const [isPending, startTransition] = useTransition();

  const hasMore = products.length < total;

  const loadMore = async () => {
    startTransition(async () => {
      try {
        // API Route를 통해 추가 상품 로드
        const params = new URLSearchParams();
        if (category) {
          params.set("category", category);
        }
        params.set("sort", sortBy);
        params.set("limit", String(limit + 12));
        params.set("offset", String(products.length));

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) {
          throw new Error("상품을 불러오는 중 오류가 발생했습니다.");
        }

        const data = await response.json();
        setProducts([...products, ...data.products]);
        setLimit(limit + 12);
      } catch (error) {
        console.error("Error loading more products:", error);
        // 에러 발생 시 사용자에게 알림 (추후 toast 등으로 개선 가능)
        alert("상품을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={loadMore}
            disabled={isPending}
            size="lg"
            variant="outline"
            className="min-w-[200px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                로딩 중...
              </>
            ) : (
              <>
                더 보기
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* 총 상품 개수 표시 */}
      {!hasMore && products.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          모든 상품을 불러왔습니다 (총 {total}개)
        </div>
      )}
    </>
  );
}
