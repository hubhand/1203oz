/**
 * @file types/product.ts
 * @description 상품 데이터 타입 정의
 *
 * Supabase products 테이블 스키마와 일치하는 TypeScript 타입 정의
 */

/**
 * 상품 정보 타입
 * Supabase products 테이블의 스키마와 일치
 */
export interface Product {
  /** 상품 고유 ID (UUID) */
  id: string;
  /** 상품명 */
  name: string;
  /** 상품 설명 */
  description: string | null;
  /** 가격 (DECIMAL) */
  price: number;
  /** 카테고리 */
  category: string | null;
  /** 재고 수량 */
  stock_quantity: number;
  /** 활성화 여부 */
  is_active: boolean;
  /** 생성일시 */
  created_at: string;
  /** 수정일시 */
  updated_at: string;
}
