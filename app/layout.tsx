/**
 * @file app/layout.tsx
 * @description Next.js Root Layout with Clerk 한국어 로컬라이제이션
 *
 * 이 파일은 애플리케이션의 루트 레이아웃을 정의하며, Clerk 인증 제공자를 설정합니다.
 * Clerk 컴포넌트들이 한국어로 표시되도록 `koKR` 로컬라이제이션을 적용합니다.
 *
 * 주요 기능:
 * 1. ClerkProvider로 전역 인증 컨텍스트 제공
 * 2. 한국어 로컬라이제이션 적용 (koKR)
 * 3. HTML lang 속성을 "ko"로 설정
 * 4. 사용자 동기화 프로바이더 포함
 *
 * @see {@link https://clerk.com/docs/guides/customizing-clerk/localization} - Clerk 로컬라이제이션 가이드
 */

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SyncUserProvider } from "@/components/providers/sync-user-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bath Essentials - 프리미엄 욕실용품 쇼핑몰",
  description:
    "샤워용품, 욕조용품, 세면대 등 프리미엄 욕실용품을 한 곳에서 만나보세요",
};

/**
 * Root Layout 컴포넌트
 *
 * Clerk의 모든 컴포넌트(SignIn, SignUp, UserButton 등)가 한국어로 표시됩니다.
 *
 * @example
 * 로그인 모달, 회원가입 폼, 사용자 프로필 메뉴 등 모든 Clerk UI가 한국어로 렌더링됩니다.
 *
 * 커스텀 번역을 추가하려면:
 * ```tsx
 * const customKorean = {
 *   ...koKR,
 *   signIn: {
 *     ...koKR.signIn,
 *     title: "커스텀 로그인 제목",
 *   },
 * };
 *
 * <ClerkProvider localization={customKorean}>
 * ```
 *
 * 에러 메시지 커스터마이징:
 * ```tsx
 * const customKorean = {
 *   ...koKR,
 *   unstable__errors: {
 *     ...koKR.unstable__errors,
 *     not_allowed_access: "접근이 허용되지 않습니다. 관리자에게 문의하세요.",
 *   },
 * };
 * ```
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SyncUserProvider>
            <Navbar />
            {children}
            <Footer />
          </SyncUserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
