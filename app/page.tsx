/**
 * @file app/page.tsx
 * @description 욕실용품 쇼핑몰 메인 페이지
 *
 * 욕실용품 판매를 위한 메인 랜딩 페이지입니다.
 * 히어로 섹션, 카테고리, 인기 제품 등을 포함합니다.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Droplet,
  Sparkles,
  ShowerHead,
  Bath,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  // 카테고리 데이터
  const categories = [
    {
      name: "샤워용품",
      icon: ShowerHead,
      description: "샤워기, 샤워 헤드, 샤워 커튼",
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "욕조용품",
      icon: Bath,
      description: "욕조, 목욕 가구, 욕조 액세서리",
      color: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "세면대",
      icon: Droplet,
      description: "세면대, 수도꼭지, 거울",
      color: "bg-cyan-50 dark:bg-cyan-950",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "액세서리",
      icon: Sparkles,
      description: "수건걸이, 선반, 수납함",
      color: "bg-pink-50 dark:bg-pink-950",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
  ];

  // 인기 제품 데이터 (예시)
  const featuredProducts = [
    {
      id: 1,
      name: "프리미엄 샤워 헤드",
      price: "89,000원",
      originalPrice: "129,000원",
      rating: 4.8,
      reviews: 234,
      image: "🚿",
      badge: "인기",
    },
    {
      id: 2,
      name: "스마트 수도꼭지",
      price: "159,000원",
      originalPrice: "199,000원",
      rating: 4.9,
      reviews: 156,
      image: "💧",
      badge: "신상품",
    },
    {
      id: 3,
      name: "욕조용 목베개",
      price: "39,000원",
      originalPrice: null,
      rating: 4.7,
      reviews: 89,
      image: "🛁",
      badge: null,
    },
    {
      id: 4,
      name: "벽걸이 수납 선반",
      price: "49,000원",
      originalPrice: "69,000원",
      rating: 4.6,
      reviews: 312,
      image: "📦",
      badge: "베스트",
    },
    {
      id: 5,
      name: "LED 거울",
      price: "189,000원",
      originalPrice: "249,000원",
      rating: 4.9,
      reviews: 278,
      image: "🪞",
      badge: "인기",
    },
    {
      id: 6,
      name: "수건걸이 세트",
      price: "29,000원",
      originalPrice: null,
      rating: 4.5,
      reviews: 145,
      image: "🪣",
      badge: null,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-blue-950 dark:via-cyan-950 dark:to-purple-950 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              프리미엄 욕실용품
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              당신의 욕실을 더욱 편리하고 아름답게 만들어드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <ShoppingCart className="mr-2 h-5 w-5" />
                쇼핑 시작하기
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                제품 둘러보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              카테고리별 제품
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              원하는 카테고리를 선택해보세요
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${category.name.toLowerCase()}`}
                  className="group"
                >
                  <div
                    className={`${category.color} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                  >
                    <div className={`${category.iconColor} mb-4`}>
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 인기 제품 섹션 */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">인기 제품</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              고객들이 가장 많이 선택한 제품들
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {product.badge && (
                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {product.badge}
                    </span>
                  )}
                  <div className="text-6xl mb-4 text-center">
                    {product.image}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-semibold">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews}개 리뷰)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg px-8">
              더 많은 제품 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">무료 배송</h3>
              <p className="text-gray-600 dark:text-gray-400">
                5만원 이상 구매 시 무료 배송
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">품질 보장</h3>
              <p className="text-gray-600 dark:text-gray-400">
                1년 무상 A/S 보장
              </p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 dark:bg-cyan-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">고객 만족</h3>
              <p className="text-gray-600 dark:text-gray-400">
                98% 고객 만족도
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
