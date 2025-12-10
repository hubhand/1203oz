/**
 * @file clerk-client.ts
 * @description Clerk + Supabase 네이티브 통합 클라이언트 (Client Component용)
 *
 * 이 파일은 Client Component에서 사용할 Supabase 클라이언트를 React Hook으로 제공합니다.
 * Clerk의 세션 토큰을 자동으로 Supabase 요청에 포함시켜 인증을 처리합니다.
 *
 * 주요 기능:
 * 1. Client Component에서 데이터 조회 및 변경
 * 2. 실시간 구독 (Realtime subscriptions)
 * 3. Clerk 세션 토큰을 자동으로 포함하여 RLS 정책 적용
 *
 * 핵심 구현 로직:
 * - useAuth().getToken()으로 현재 세션 토큰 획득
 * - useMemo로 클라이언트 인스턴스 메모이제이션
 * - Supabase createClient의 accessToken 옵션으로 토큰 자동 주입
 * - 네이티브 통합 방식 사용 (2025년 4월 이후 권장, JWT 템플릿 불필요)
 *
 * @dependencies
 * - @supabase/supabase-js: Supabase 클라이언트 라이브러리
 * - @clerk/nextjs: Clerk 클라이언트 사이드 인증
 * - react: React Hook 사용
 *
 * @see {@link https://clerk.com/docs/guides/development/integrations/databases/supabase} - Clerk 공식 통합 가이드
 * @see {@link https://supabase.com/docs/guides/auth/third-party/clerk} - Supabase Clerk 통합 문서
 */

"use client";

import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 Hook (Client Component용)
 *
 * 2025년 4월부터 권장되는 네이티브 통합 방식:
 * - JWT 템플릿 불필요
 * - useAuth().getToken()으로 현재 세션 토큰 사용
 * - React Hook으로 제공되어 Client Component에서 사용
 * - 각 요청마다 최신 토큰을 자동으로 가져옴
 *
 * @returns Supabase 클라이언트 인스턴스 (Clerk 인증 포함)
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';
 * import { useEffect, useState } from 'react';
 *
 * export default function TasksList() {
 *   const supabase = useClerkSupabaseClient();
 *   const [tasks, setTasks] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *
 *   useEffect(() => {
 *     async function loadTasks() {
 *       const { data, error } = await supabase
 *         .from('tasks')
 *         .select('*');
 *
 *       if (error) {
 *         console.error('Error loading tasks:', error);
 *         return;
 *       }
 *
 *       setTasks(data || []);
 *       setLoading(false);
 *     }
 *
 *     loadTasks();
 *   }, [supabase]);
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       {tasks.map((task) => (
 *         <div key={task.id}>{task.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';
 *
 * export default function AddTaskForm() {
 *   const supabase = useClerkSupabaseClient();
 *   const [name, setName] = useState('');
 *
 *   async function handleSubmit(e: React.FormEvent) {
 *     e.preventDefault();
 *
 *     const { error } = await supabase
 *       .from('tasks')
 *       .insert({ name });
 *
 *     if (error) {
 *       console.error('Error adding task:', error);
 *       return;
 *     }
 *
 *     setName('');
 *     window.location.reload();
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         value={name}
 *         onChange={(e) => setName(e.target.value)}
 *         placeholder="Enter task name"
 *       />
 *       <button type="submit">Add Task</button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useClerkSupabaseClient() {
  const { getToken } = useAuth();

  const supabase = useMemo(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
    }

    return createClient(supabaseUrl, supabaseKey, {
      async accessToken() {
        // Clerk 세션 토큰을 가져와서 Supabase 요청에 포함
        // 이 토큰은 RLS 정책에서 auth.jwt()->>'sub'로 접근 가능
        return (await getToken()) ?? null;
      },
    });
  }, [getToken]);

  return supabase;
}
