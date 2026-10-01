import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollToDeals: () => void;
  onOpenResearchModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToDeals,
  onOpenResearchModal,
}) => {
  return (
    <footer id="about" className="bg-white border-t border-stone-200 pt-12 pb-10 text-stone-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200/80">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EE4D2D] flex items-center justify-center text-white">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-stone-900 tracking-tight">
                Shopee Deals Vietnam
              </span>
            </div>
            {/* Required Disclaimer */}
            <p className="text-xs text-stone-600 leading-relaxed max-w-md">
              Website chia sẻ các sản phẩm chất lượng với giá ưu đãi.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-md">
              Các liên kết sản phẩm có thể là liên kết tiếp thị liên kết (affiliate). Khi bạn mua hàng qua liên kết, chúng tôi có thể nhận được một khoản hoa hồng nhỏ mà bạn không phải trả thêm bất kỳ chi phí nào.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 max-w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Không yêu cầu đăng nhập · Không thu thập dữ liệu cá nhân</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Điều hướng nhanh
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onScrollToDeals}
                  className="hover:text-[#EE4D2D] transition-colors cursor-pointer"
                >
                  Deal hot hôm nay
                </button>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#EE4D2D] transition-colors">
                  Danh mục sản phẩm
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenResearchModal}
                  className="hover:text-[#EE4D2D] transition-colors cursor-pointer"
                >
                  Tài liệu nghiên cứu UX
                </button>
              </li>
              <li>
                <a
                  href="https://shopee.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EE4D2D] transition-colors inline-flex items-center gap-1"
                >
                  <span>Sàn Shopee Mall</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Media & Contacts */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Kết nối & Chia sẻ Deal
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Kênh cập nhật mã giảm giá Shopee, flash sale chớp nhoáng hàng ngày:
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#EE4D2D] hover:text-white flex items-center justify-center transition-colors text-stone-600 text-xs font-bold"
                title="Facebook Group Săn Deal"
              >
                FB
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#EE4D2D] hover:text-white flex items-center justify-center transition-colors text-stone-600 text-xs font-bold"
                title="Kênh Telegram Deal Ngon"
              >
                TG
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#EE4D2D] hover:text-white flex items-center justify-center transition-colors text-stone-600 text-xs font-bold"
                title="Cộng đồng Zalo Săn Sale"
              >
                ZL
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#EE4D2D] hover:text-white flex items-center justify-center transition-colors text-stone-600 text-xs font-bold"
                title="TikTok Review Deal"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Shopee Affiliate & UX Research Prototype. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Thiết kế tối ưu trải nghiệm người dùng với</span>
            <Heart className="w-3.5 h-3.5 text-[#EE4D2D] fill-[#EE4D2D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
