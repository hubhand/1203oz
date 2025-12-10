/**
 * @file lib/supabase/products.ts
 * @description Supabase 상품 조회 함수
 *
 * Server Component에서 사용할 상품 데이터 조회 함수들
 * lib/supabase/server.ts의 createClient()를 사용하여 인증된 요청 처리
 */

import { createClient } from "./server";
import type { Product } from "@/types/product";

/**
 * 정렬 옵션 타입
 */
export type SortOption =
  | "price_asc"
  | "price_desc"
  | "newest"
  | "oldest"
  | "name_asc";

/**
 * 페이지네이션 결과 타입
 */
export interface PaginatedProducts {
  products: Product[];
  total: number;
}

/**
 * 모든 활성 상품 조회
 * @returns 활성화된 상품 목록
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("상품을 불러오는 중 오류가 발생했습니다.");
  }

  return (data as Product[]) || [];
}

/**
 * 카테고리별 상품 조회
 * @param category 카테고리 값 (예: 'shower')
 * @returns 해당 카테고리의 활성 상품 목록
 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("상품을 불러오는 중 오류가 발생했습니다.");
  }

  return (data as Product[]) || [];
}

/**
 * 인기 상품 조회 (홈페이지용)
 * @param limit 조회할 상품 개수 (기본값: 6)
 * @returns 인기 상품 목록
 */
export async function getFeaturedProducts(
  limit: number = 6,
): Promise<Product[]> {
  try {
    // 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "Supabase environment variables are missing. Returning empty array.",
      );
      return [];
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      // 에러 객체가 비어있을 수 있으므로 안전하게 처리
      const errorInfo = {
        message: error?.message || "Unknown error",
        details: error?.details || null,
        hint: error?.hint || null,
        code: error?.code || "UNKNOWN",
      };

      console.error("Error fetching featured products:", errorInfo);

      // 테이블이 없거나 권한 문제인 경우 빈 배열 반환
      if (
        error?.code === "42P01" || // relation does not exist
        error?.code === "PGRST301" || // schema not found
        error?.message?.includes("relation") ||
        error?.message?.includes("does not exist")
      ) {
        console.warn(
          "Products table may not exist. Please run migrations or create the table.",
        );
      }

      // 에러가 발생해도 앱이 크래시되지 않도록 빈 배열 반환
      return [];
    }

    return (data as Product[]) || [];
  } catch (err) {
    // 예상치 못한 에러 처리 (예: 환경 변수 누락, 네트워크 에러 등)
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Unexpected error in getFeaturedProducts:", {
      message: errorMessage,
      error: err,
    });
    // 에러가 발생해도 앱이 크래시되지 않도록 빈 배열 반환
    return [];
  }
}

/**
 * 정렬 및 페이지네이션을 지원하는 상품 조회
 * @param category 카테고리 값 (선택)
 * @param sortBy 정렬 옵션 (기본값: 'newest')
 * @param limit 조회할 상품 개수 (기본값: 12)
 * @param offset 건너뛸 상품 개수 (기본값: 0)
 * @returns 상품 목록 및 총 개수
 */
export async function getProductsWithPagination(
  category?: string,
  sortBy: SortOption = "newest",
  limit: number = 12,
  offset: number = 0,
): Promise<PaginatedProducts> {
  const supabase = await createClient();

  // 쿼리 빌더 시작
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_active", true);

  // 카테고리 필터 적용
  if (category) {
    query = query.eq("category", category);
  }

  // 정렬 적용
  switch (sortBy) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  // 페이지네이션 적용
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching products with pagination:", error);
    throw new Error("상품을 불러오는 중 오류가 발생했습니다.");
  }

  return {
    products: (data as Product[]) || [],
    total: count || 0,
  };
}

/**
 * 단일 상품 조회
 * @param id 상품 ID (UUID)
 * @returns 상품 정보
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 상품을 찾을 수 없음
      return null;
    }
    console.error("Error fetching product by id:", error);
    throw new Error("상품을 불러오는 중 오류가 발생했습니다.");
  }

  return data as Product;
}
