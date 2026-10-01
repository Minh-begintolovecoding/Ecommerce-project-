/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  ScenarioType, 
  CategoryType, 
  Product, 
  ExperimentClickLog 
} from './types';
import { INITIAL_PRODUCTS, CATEGORIES } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScenarioSelector } from './components/ScenarioSelector';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ResearchInfoModal } from './components/ResearchInfoModal';
import { AffiliateConfigModal } from './components/AffiliateConfigModal';
import { Footer } from './components/Footer';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Flame, 
  ArrowUpDown, 
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Scenario state: control | scarcity | sneaking | both
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('control');
  const [isExperimentMode, setIsExperimentMode] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'discount'>('popular');

  // Modals & inspect states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [isAffiliateConfigOpen, setIsAffiliateConfigOpen] = useState(false);
  const [clickLogs, setClickLogs] = useState<ExperimentClickLog[]>(() => {
    try {
      const saved = localStorage.getItem('ux_affiliate_click_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ux_affiliate_click_logs', JSON.stringify(clickLogs));
    } catch {
      // ignore storage quota issues
    }
  }, [clickLogs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Scenario change handler
  const handleScenarioChange = (newScenario: ScenarioType) => {
    setCurrentScenario(newScenario);
    showToast(`Đã chuyển sang kịch bản: ${newScenario.toUpperCase()}`);
  };

  // Buy click handler: logs event and opens affiliate link in new tab
  const handleBuyClick = (product: Product, calculatedPrice: number) => {
    const activeScenario = isExperimentMode ? currentScenario : 'control';
    const newLog: ExperimentClickLog = {
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      productId: product.id,
      productName: product.name,
      scenario: activeScenario,
      affiliateUrl: product.affiliateUrl,
      calculatedPrice,
    };

    setClickLogs((prev) => [newLog, ...prev]);

    // Mandatory affiliate redirect via window.open without requiring authentication
    try {
      window.open(product.affiliateUrl, '_blank');
    } catch (err) {
      console.warn('Pop-up blocker might have prevented automatic window.open', err);
    }

    showToast(`Đã mở link Shopee cho: ${product.name}`);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      'Tất cả': products.length,
      'Áo thun': 0,
      'Áo sơ mi': 0,
      'Quần jean': 0,
      'Quần kaki': 0,
      'Áo khoác': 0,
      'Balo': 0,
      'Túi xách': 0,
      'Giày': 0,
      'Phụ kiện': 0,
    };

    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'Tất cả' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.salePrice - b.salePrice;
        if (sortBy === 'price-desc') return b.salePrice - a.salePrice;
        if (sortBy === 'discount') return b.discount - a.discount;
        return b.reviewCount - a.reviewCount; // popular
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Affiliate link batch update
  const handleApplyGlobalAffiliateUrl = (prefix: string) => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        affiliateUrl: `${prefix.trim()}?product_id=${p.id}&src=affiliate_landing`,
      }))
    );
    showToast('Đã áp dụng link affiliate toàn hệ thống!');
  };

  // Reset affiliate URLs to initial values
  const handleResetDefaultUrls = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Đã khôi phục liên kết affiliate mặc định.');
  };

  // Single product affiliate URL update
  const handleUpdateProductAffiliateUrl = (productId: string, newUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, affiliateUrl: newUrl } : p))
    );
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => (prev ? { ...prev, affiliateUrl: newUrl } : null));
    }
    showToast('Đã cập nhật link affiliate cho sản phẩm!');
  };

  const scrollToDeals = () => {
    document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const effectiveScenario = isExperimentMode ? currentScenario : 'control';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] text-[#222222]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-stone-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl border border-stone-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        onScrollToDeals={scrollToDeals}
        onScrollToCategories={scrollToCategories}
        onOpenResearchModal={() => setIsResearchModalOpen(true)}
        activeScenarioName={effectiveScenario}
      />

      {/* Experimental Scenario Selector Toolbar */}
      <ScenarioSelector
        currentScenario={currentScenario}
        onScenarioChange={handleScenarioChange}
        isExperimentMode={isExperimentMode}
        onToggleExperimentMode={(enabled) => {
          setIsExperimentMode(enabled);
          showToast(enabled ? 'Đã bật Experimental Mode' : 'Đã tắt Experimental Mode (trở về Control)');
        }}
        onOpenResearchModal={() => setIsResearchModalOpen(true)}
        onOpenAffiliateConfig={() => setIsAffiliateConfigOpen(true)}
        totalClicksCount={clickLogs.length}
      />

      {/* Hero Section */}
      <Hero onScrollToDeals={scrollToDeals} />

      {/* Category Section & Tabs */}
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Catalog & Filter Controls Section */}
      <main id="deals" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Section Heading & Search / Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-[#EE4D2D]/10 text-[#EE4D2D]">
                <Flame className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Deal Hot Đang Giảm Giá
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Đang hiển thị {filteredProducts.length} sản phẩm · Kịch bản:{' '}
              <span className="font-semibold text-stone-800 capitalize">
                {effectiveScenario}
              </span>
            </p>
          </div>

          {/* Search bar & Sorting bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm áo thun, hoodie, giày..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#EE4D2D] focus:border-[#EE4D2D] outline-none shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-transparent border-none outline-none font-medium text-stone-700 cursor-pointer"
              >
                <option value="popular">Bán chạy nhất</option>
                <option value="discount">Giảm giá nhiều nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                scenario={effectiveScenario}
                onBuyClick={handleBuyClick}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
            <SlidersHorizontal className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 mb-1">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Thử tìm với từ khóa khác hoặc xóa bộ lọc danh mục.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        )}

        {/* Affiliate Bottom Callout */}
        <section className="mt-12 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl border border-orange-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EE4D2D] uppercase tracking-wider bg-[#EE4D2D]/10 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3" />
              Tiếp thị liên kết minh bạch
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              Bạn muốn săn thêm voucher giảm giá Shopee?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Tất cả liên kết dẫn thẳng đến Shopee Mall chính hãng. Bạn được áp dụng đầy đủ mã miễn phí vận chuyển Freeship Xtra và voucher sàn của bạn.
            </p>
          </div>
          <a
            href="https://shopee.vn"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#EE4D2D] hover:bg-[#d83f20] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            <span>Mở Trang Chủ Shopee</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onScrollToDeals={scrollToDeals}
        onOpenResearchModal={() => setIsResearchModalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        scenario={effectiveScenario}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onBuyClick={handleBuyClick}
        onUpdateProductAffiliateUrl={handleUpdateProductAffiliateUrl}
      />

      {/* Research Center Modal */}
      <ResearchInfoModal
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
        logs={clickLogs}
        onClearLogs={() => setClickLogs([])}
        currentScenario={effectiveScenario}
      />

      {/* Affiliate Link Configuration Modal */}
      <AffiliateConfigModal
        isOpen={isAffiliateConfigOpen}
        onClose={() => setIsAffiliateConfigOpen(false)}
        onApplyGlobalUrl={handleApplyGlobalAffiliateUrl}
        onResetDefaultUrls={handleResetDefaultUrls}
      />
    </div>
  );
}
