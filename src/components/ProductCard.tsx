import React, { useState } from 'react';
import { Product, ScenarioType } from '../types';
import { 
  ExternalLink, 
  Eye, 
  AlertTriangle, 
  Truck, 
  Star, 
  Info,
  CheckCircle2,
  Package
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  scenario: ScenarioType;
  onBuyClick: (product: Product, calculatedPrice: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  scenario,
  onBuyClick,
  onQuickView,
}) => {
  const [imageError, setImageError] = useState(false);

  // Currency formatter for VND: e.g. 599.000đ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const hasScarcity = scenario === 'scarcity' || scenario === 'both';
  const hasSneaking = scenario === 'sneaking' || scenario === 'both';

  const shippingFee = product.experimental.sneaking.shippingFee;
  const shippingLabel = product.experimental.sneaking.feeLabel || 'Premium Shipping';
  const totalPrice = hasSneaking ? product.salePrice + shippingFee : product.salePrice;

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyClick(product, totalPrice);
  };

  // Badge styling according to badge type
  const getBadgeStyle = (badge: Product['badge']) => {
    switch (badge) {
      case 'Deal hot':
        return 'bg-[#EE4D2D] text-white';
      case 'Giảm sâu':
        return 'bg-purple-600 text-white';
      case 'Bán chạy':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-stone-800 text-white';
    }
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer relative"
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400 p-4 text-center">
            <Package className="w-10 h-10 mb-2 text-stone-400" />
            <span className="text-xs font-medium text-stone-600">{product.name}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-xs ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
          <span className="px-1.5 py-0.5 text-[11px] font-bold rounded-md bg-stone-900/80 backdrop-blur-xs text-white">
            -{product.discount}%
          </span>
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="px-3 py-1.5 rounded-lg bg-white/95 text-stone-900 text-xs font-semibold shadow-md backdrop-blur-xs">
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="font-medium text-stone-500">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-700">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name (H3) */}
        <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#EE4D2D] transition-colors">
          {product.name}
        </h3>

        {/* Standard Base Price */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-base sm:text-lg font-extrabold text-[#EE4D2D] font-mono tabular-nums">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          {/* ========================================================================= */}
          {/* EXPERIMENTAL TREATMENT: SCARCITY */}
          {/* ========================================================================= */}
          {hasScarcity && (
            <div className="my-2.5 p-2 bg-amber-50/90 border border-amber-200/80 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Chỉ còn {product.experimental.scarcity.stockRemaining} sản phẩm</span>
                </div>
                <span className="text-[9px] font-mono uppercase bg-amber-200/60 text-amber-800 px-1 py-0.2 rounded">
                  Mock
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-700 text-[11px]">
                <Eye className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{product.experimental.scarcity.viewers} người đang xem sản phẩm này</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* EXPERIMENTAL TREATMENT: SNEAKING (Hidden / Additional Cost Breakdown) */}
          {/* ========================================================================= */}
          {hasSneaking && (
            <div className="my-2.5 p-2.5 bg-rose-50/80 border border-rose-200/80 rounded-xl text-xs">
              <div className="flex items-center justify-between text-[10px] font-semibold text-rose-800 uppercase tracking-wider mb-1.5 pb-1 border-b border-rose-200">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-rose-600" />
                  Chi tiết giá mô phỏng
                </span>
                <span className="text-[9px] bg-rose-200 text-rose-800 px-1 rounded">
                  Sneaking Sim
                </span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-stone-600">
                  <span>Sản phẩm</span>
                  <span>{formatPrice(product.salePrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    {shippingLabel}
                    <Info className="w-2.5 h-2.5 text-rose-400" />
                  </span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="pt-1 mt-1 border-t border-rose-200 flex justify-between font-bold text-stone-900">
                  <span>Tổng cộng</span>
                  <span className="text-rose-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <p className="text-[9px] text-rose-600/80 mt-1 italic leading-tight">
                * Mô phỏng nghiên cứu UX. Không áp dụng vào giá thanh toán thực tế Shopee.
              </p>
            </div>
          )}

          {/* CTA Button: “Mua Ngay” */}
          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleBuy}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#EE4D2D] hover:bg-[#d83f20] active:scale-98 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Mua Ngay</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-stone-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Chính hãng Shopee · Không cần đăng nhập</span>
          </div>
        </div>
      </div>
    </article>
  );
};
