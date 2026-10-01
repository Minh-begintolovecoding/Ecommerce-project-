import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  onScrollToDeals: () => void;
  onScrollToCategories: () => void;
  onOpenResearchModal: () => void;
  activeScenarioName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToDeals,
  onScrollToCategories,
  onOpenResearchModal,
  activeScenarioName,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Zone - Single text element / wordmark */}
          <a
            href="/"
            className="flex items-center gap-2 group text-decoration-none"
            title="DealHot Shopee - Mua đúng giá, đúng chỗ"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EE4D2D] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-[#EE4D2D] transition-colors leading-none">
                Shopee Deals
              </span>
              <span className="text-[10px] text-stone-400 font-medium tracking-wide">
                Affiliate & Research
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover underlines) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              type="button"
              onClick={onScrollToDeals}
              className="hover:text-[#EE4D2D] transition-colors cursor-pointer"
            >
              Deal hot hôm nay
            </button>
            <button
              type="button"
              onClick={onScrollToCategories}
              className="hover:text-[#EE4D2D] transition-colors cursor-pointer"
            >
              Danh mục sản phẩm
            </button>
            <button
              type="button"
              onClick={onOpenResearchModal}
              className="hover:text-[#EE4D2D] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Nghiên cứu UX</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-stone-100 text-stone-600 rounded capitalize">
                {activeScenarioName}
              </span>
            </button>
            <a
              href="#about"
              className="hover:text-[#EE4D2D] transition-colors"
            >
              Về chúng tôi
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onScrollToDeals}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#EE4D2D] hover:bg-[#d83f20] rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Xem Deal Hot</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
