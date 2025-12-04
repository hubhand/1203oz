/**
 * @file components/Footer.tsx
 * @description 욕실용품 쇼핑몰 푸터
 */

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🚿</div>
              <span className="text-xl font-bold text-white">Bath Essentials</span>
            </div>
            <p className="text-sm mb-4">
              프리미엄 욕실용품으로 당신의 일상을 더욱 편리하고 아름답게 만들어드립니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 쇼핑 */}
          <div>
            <h3 className="text-white font-semibold mb-4">쇼핑</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/shower" className="hover:text-white transition-colors">
                  샤워용품
                </Link>
              </li>
              <li>
                <Link href="/category/bath" className="hover:text-white transition-colors">
                  욕조용품
                </Link>
              </li>
              <li>
                <Link href="/category/sink" className="hover:text-white transition-colors">
                  세면대
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-white transition-colors">
                  액세서리
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="text-white font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  배송 정보
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  반품/교환
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1588-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@bathessentials.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Bath Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

