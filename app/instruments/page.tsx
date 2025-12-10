/**
 * @file app/instruments/page.tsx
 * @description Supabase 공식 Next.js 퀵스타트 가이드 패턴을 따르는 예제 페이지
 *
 * 이 페이지는 Supabase 공식 문서의 예제를 기반으로 작성되었습니다:
 * https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 *
 * 주요 기능:
 * 1. Server Component에서 Supabase 데이터 조회
 * 2. Suspense를 사용한 비동기 데이터 로딩
 * 3. Clerk 인증이 포함된 Supabase 클라이언트 사용
 */

import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

/**
 * Instruments 데이터를 조회하는 Server Component
 *
 * Supabase의 `instruments` 테이블에서 모든 데이터를 조회합니다.
 * Clerk 인증이 포함된 Supabase 클라이언트를 사용하므로 RLS 정책이 적용됩니다.
 */
async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();

  if (error) {
    console.error("Error fetching instruments:", error);
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          데이터를 불러오는 중 오류가 발생했습니다: {error.message}
        </p>
      </div>
    );
  }

  if (!instruments || instruments.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-600 dark:text-yellow-400">
          데이터가 없습니다. Supabase에서 instruments 테이블을 생성하고 데이터를
          추가해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">악기 목록</h2>
      <ul className="space-y-2">
        {instruments.map((instrument: any) => (
          <li
            key={instrument.id}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="font-medium">{instrument.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          <strong>참고:</strong> 이 데이터는 Supabase의 instruments 테이블에서
          가져온 것입니다. Supabase Dashboard에서 테이블을 생성하고 데이터를
          추가할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

/**
 * Instruments 페이지 메인 컴포넌트
 *
 * Suspense를 사용하여 비동기 데이터 로딩을 처리합니다.
 */
export default function Instruments() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Supabase 데이터 조회 예제</h1>
      <Suspense
        fallback={
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              악기 데이터를 불러오는 중...
            </p>
          </div>
        }
      >
        <InstrumentsData />
      </Suspense>
    </div>
  );
}
