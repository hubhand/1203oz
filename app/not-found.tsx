/**
 * @file app/not-found.tsx
 * @description 404 Not Found 페이지
 *
 * 존재하지 않는 페이지에 접근했을 때 표시되는 커스텀 404 페이지
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              홈으로 가기
            </Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5" />
              상품 둘러보기
            </Button>
          </Link>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            이전 페이지로
          </Button>
        </div>
      </div>
    </main>
  );
}

