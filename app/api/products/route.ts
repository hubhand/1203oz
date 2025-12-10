/**
 * @file app/api/products/route.ts
 * @description 상품 목록 API Route
 *
 * 페이지네이션을 위한 추가 상품 데이터를 제공하는 API
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getProductsWithPagination,
  type SortOption,
} from "@/lib/supabase/products";

/**
 * GET /api/products
 * 페이지네이션을 위한 추가 상품 데이터 조회
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const sortBy = (searchParams.get("sort") as SortOption) || "newest";
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const { products, total } = await getProductsWithPagination(
      category,
      sortBy,
      limit,
      offset,
    );

    return NextResponse.json({ products, total });
  } catch (error) {
    console.error("Error in products API route:", error);
    return NextResponse.json(
      { error: "상품을 불러오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
