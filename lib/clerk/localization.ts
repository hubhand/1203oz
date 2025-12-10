/**
 * @file lib/clerk/localization.ts
 * @description Clerk 한국어 로컬라이제이션 커스터마이징
 *
 * 이 파일은 Clerk의 기본 한국어 로컬라이제이션을 확장하거나 커스터마이징하는 데 사용됩니다.
 * 기본 `koKR` 로컬라이제이션에 추가적인 커스텀 번역을 적용할 수 있습니다.
 *
 * 사용 예시:
 * ```tsx
 * import { customKoreanLocalization } from '@/lib/clerk/localization';
 *
 * <ClerkProvider localization={customKoreanLocalization}>
 * ```
 *
 * @see {@link https://clerk.com/docs/guides/customizing-clerk/localization} - Clerk 로컬라이제이션 가이드
 */

import { koKR } from "@clerk/localizations";

/**
 * 커스텀 한국어 로컬라이제이션
 *
 * 기본 `koKR` 로컬라이제이션을 확장하여 특정 텍스트를 커스터마이징할 수 있습니다.
 *
 * 현재는 기본 `koKR`을 그대로 사용하지만, 필요시 여기에 커스텀 번역을 추가할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 특정 텍스트 커스터마이징
 * export const customKoreanLocalization = {
 *   ...koKR,
 *   signIn: {
 *     ...koKR.signIn,
 *     title: "환영합니다",
 *     subtitle: "계정에 로그인하여 계속하세요",
 *   },
 *   signUp: {
 *     ...koKR.signUp,
 *     title: "계정 만들기",
 *     subtitle: "새 계정을 만들어 시작하세요",
 *   },
 * };
 * ```
 *
 * @example
 * ```tsx
 * // 에러 메시지 커스터마이징
 * export const customKoreanLocalization = {
 *   ...koKR,
 *   unstable__errors: {
 *     ...koKR.unstable__errors,
 *     not_allowed_access: "접근이 허용되지 않습니다. 관리자에게 문의하세요.",
 *     form_identifier_not_found: "입력하신 정보를 찾을 수 없습니다.",
 *   },
 * };
 * ```
 */
export const customKoreanLocalization = {
  ...koKR,
  // 필요시 여기에 커스텀 번역 추가
  // 예: signIn, signUp, unstable__errors 등의 속성 커스터마이징
};

/**
 * 기본 한국어 로컬라이제이션 (재export)
 *
 * 커스터마이징이 필요 없는 경우 기본 `koKR`을 직접 사용할 수 있습니다.
 */
export { koKR };
