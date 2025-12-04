/**
 * @file server.ts
 * @description Clerk + Supabase 네이티브 통합 클라이언트 (Server Component/Server Action용)
 *
 * 이 파일은 Server Component와 Server Action에서 사용할 Supabase 클라이언트를 제공합니다.
 * Clerk의 세션 토큰을 자동으로 Supabase 요청에 포함시켜 인증을 처리합니다.
 *
 * 주요 기능:
 * 1. Server Component에서 데이터 조회 시 사용
 * 2. Server Action에서 데이터 변경 시 사용
 * 3. Clerk 세션 토큰을 자동으로 포함하여 RLS 정책 적용
 *
 * 핵심 구현 로직:
 * - Clerk의 auth().getToken()으로 현재 세션 토큰 획득
 * - Supabase createClient의 accessToken 옵션으로 토큰 자동 주입
 * - 네이티브 통합 방식 사용 (2025년 4월 이후 권장, JWT 템플릿 불필요)
 *
 * @dependencies
 * - @supabase/supabase-js: Supabase 클라이언트 라이브러리
 * - @clerk/nextjs/server: Clerk 서버 사이드 인증
 *
 * @see {@link https://clerk.com/docs/guides/development/integrations/databases/supabase} - Clerk 공식 통합 가이드
 * @see {@link https://supabase.com/docs/guides/auth/third-party/clerk} - Supabase Clerk 통합 문서
 */

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 생성 (Server Component/Server Action용)
 *
 * 2025년 4월부터 권장되는 네이티브 통합 방식:
 * - JWT 템플릿 불필요
 * - Clerk 토큰을 Supabase가 자동 검증
 * - auth().getToken()으로 현재 세션 토큰 사용
 * - 각 요청마다 최신 토큰을 자동으로 가져옴
 *
 * @returns Supabase 클라이언트 인스턴스 (Clerk 인증 포함)
 *
 * @example
 * ```tsx
 * // Server Component
 * import { createClerkSupabaseClient } from '@/lib/supabase/server';
 *
 * export default async function MyPage() {
 *   const supabase = createClerkSupabaseClient();
 *   const { data, error } = await supabase.from('tasks').select('*');
 *
 *   if (error) {
 *     throw error;
 *   }
 *
 *   return (
 *     <div>
 *       {data?.map((task) => (
 *         <div key={task.id}>{task.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```ts
 * // Server Action
 * 'use server';
 *
 * import { createClerkSupabaseClient } from '@/lib/supabase/server';
 *
 * export async function addTask(name: string) {
 *   const supabase = createClerkSupabaseClient();
 *
 *   const { data, error } = await supabase
 *     .from('tasks')
 *     .insert({ name });
 *
 *   if (error) {
 *     throw new Error('Failed to add task');
 *   }
 *
 *   return data;
 * }
 * ```
 */
/**
 * Clerk + Supabase 네이티브 통합 클라이언트 생성 (Server Component/Server Action용)
 *
 * 2025년 4월부터 권장되는 네이티브 통합 방식:
 * - JWT 템플릿 불필요
 * - Clerk 토큰을 Supabase가 자동 검증
 * - auth().getToken()으로 현재 세션 토큰 사용
 * - 각 요청마다 최신 토큰을 자동으로 가져옴
 *
 * @returns Supabase 클라이언트 인스턴스 (Clerk 인증 포함)
 *
 * @example
 * ```tsx
 * // Server Component
 * import { createClient } from '@/lib/supabase/server';
 *
 * export default async function MyPage() {
 *   const supabase = await createClient();
 *   const { data, error } = await supabase.from('tasks').select('*');
 *
 *   if (error) {
 *     throw error;
 *   }
 *
 *   return (
 *     <div>
 *       {data?.map((task) => (
 *         <div key={task.id}>{task.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
/**
 * Supabase 클라이언트 생성 (공식 문서 패턴)
 *
 * 공식 Next.js 퀵스타트 가이드의 패턴을 따릅니다:
 * - Server Component에서 `await createClient()` 사용
 * - Suspense와 함께 사용 가능
 *
 * @returns Supabase 클라이언트 인스턴스 (Clerk 인증 포함)
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      // Clerk 세션 토큰을 가져와서 Supabase 요청에 포함
      // 이 토큰은 RLS 정책에서 auth.jwt()->>'sub'로 접근 가능
      return (await auth()).getToken() ?? null;
    },
  });
}

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 생성 (동기 버전)
 *
 * 이 함수는 기존 코드와의 호환성을 위해 제공됩니다.
 * 새로운 코드에서는 `createClient()` (async)를 사용하는 것을 권장합니다.
 *
 * @returns Supabase 클라이언트 인스턴스 (Clerk 인증 포함)
 *
 * @deprecated 새로운 코드에서는 `createClient()` (async)를 사용하세요.
 */
export function createClerkSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      // Clerk 세션 토큰을 가져와서 Supabase 요청에 포함
      // 이 토큰은 RLS 정책에서 auth.jwt()->>'sub'로 접근 가능
      return (await auth()).getToken() ?? null;
    },
  });
}
