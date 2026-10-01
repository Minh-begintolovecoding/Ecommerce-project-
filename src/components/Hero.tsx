import React from 'react';
import { ArrowDown, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToDeals: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToDeals }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-[#F8F8F8] pt-10 pb-14 border-b border-stone-200/70">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EE4D2D]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge: “Link Sản Phẩm Chính Hãng” */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#EE4D2D] bg-[#EE4D2D]/10 rounded-full border border-[#EE4D2D]/20 mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Link Sản Phẩm Chính Hãng</span>
          </div>

          {/* Heading 1: “Deal ngon mỗi ngày – mua đúng giá, đúng chỗ” */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.2] mb-4 text-balance">
            Deal ngon mỗi ngày – mua đúng giá, đúng chỗ
          </h1>

          {/* Subtext: “Khám phá những sản phẩm được chọn lọc với mức giá ưu đãi từ Shopee.” */}
          <p className="text-base sm:text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Khám phá những sản phẩm được chọn lọc với mức giá ưu đãi từ Shopee.
          </p>

          {/* CTA: “Xem deal hot hôm nay” (Prominent, mobile-first design) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <button
              type="button"
              onClick={onScrollToDeals}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#EE4D2D] hover:bg-[#d83f20] active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Xem deal hot hôm nay</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

          {/* Trust markers */}
          <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-stone-600 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-1.5 text-center">
              <CheckCircle2 className="w-4 h-4 text-[#EE4D2D] shrink-0" />
              <span className="font-medium text-stone-800">100% Shopee Mall</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-stone-800">Ưu đãi độc quyền</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium text-stone-800">Chuyển hướng trực tiếp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
