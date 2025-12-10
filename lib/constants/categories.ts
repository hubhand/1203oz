/**
 * @file lib/constants/categories.ts
 * @description 카테고리 매핑 상수
 *
 * URL 경로와 데이터베이스 카테고리 값을 매핑하는 상수 정의
 */

/**
 * 카테고리 정보 타입
 */
export interface Category {
  /** URL 경로 (예: 'shower') */
  path: string;
  /** 데이터베이스 카테고리 값 (예: 'shower') */
  dbValue: string;
  /** 표시용 라벨 (예: '샤워용품') */
  label: string;
}

/**
 * 카테고리 목록
 * Navbar의 카테고리 링크와 일치하도록 설정
 */
export const CATEGORIES: Category[] = [
  {
    path: "shower",
    dbValue: "shower",
    label: "샤워용품",
  },
  {
    path: "bath",
    dbValue: "bath",
    label: "욕조용품",
  },
  {
    path: "sink",
    dbValue: "sink",
    label: "세면대",
  },
  {
    path: "accessories",
    dbValue: "accessories",
    label: "액세서리",
  },
];

/**
 * URL 경로로 카테고리 찾기
 * @param path URL 경로 (예: 'shower')
 * @returns 카테고리 정보 또는 undefined
 */
export function getCategoryByPath(path: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.path === path);
}

/**
 * 데이터베이스 값으로 카테고리 찾기
 * @param dbValue 데이터베이스 카테고리 값 (예: 'shower')
 * @returns 카테고리 정보 또는 undefined
 */
export function getCategoryByDbValue(dbValue: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.dbValue === dbValue);
}
