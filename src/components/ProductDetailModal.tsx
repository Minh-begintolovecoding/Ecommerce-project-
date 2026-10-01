import React, { useState } from 'react';
import { Product, ScenarioType } from '../types';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Truck, 
  Star, 
  Edit3, 
  Check, 
  Sparkles,
  Package
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  scenario: ScenarioType;
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: (product: Product, price: number) => void;
  onUpdateProductAffiliateUrl: (productId: string, newUrl: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  scenario,
  isOpen,
  onClose,
  onBuyClick,
  onUpdateProductAffiliateUrl,
}) => {
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [editedUrl, setEditedUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const hasScarcity = scenario === 'scarcity' || scenario === 'both';
  const hasSneaking = scenario === 'sneaking' || scenario === 'both';

  const shippingFee = product.experimental.sneaking.shippingFee;
  const shippingLabel = product.experimental.sneaking.feeLabel || 'Premium Shipping';
  const totalPrice = hasSneaking ? product.salePrice + shippingFee : product.salePrice;

  const handleStartEdit = () => {
    setEditedUrl(product.affiliateUrl);
    setIsEditingUrl(true);
  };

  const handleSaveEdit = () => {
    if (editedUrl.trim()) {
      onUpdateProductAffiliateUrl(product.id, editedUrl.trim());
    }
    setIsEditingUrl(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-[#EE4D2D] text-white">
              {product.badge}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              ID: {product.id} · {product.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Image */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4">
                <Package className="w-10 h-10 mb-2" />
                <span className="text-xs">{product.name}</span>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} đánh giá từ người mua)</span>
              </div>

              <h2 className="text-lg font-bold text-stone-900 leading-snug mb-2">
                {product.name}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price display */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#EE4D2D] font-mono">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xs text-stone-400 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-[11px] font-bold text-[#EE4D2D] bg-[#EE4D2D]/10 px-1.5 py-0.2 rounded">
                    Tiết kiệm {product.discount}%
                  </span>
                </div>

                {/* Scarcity Notice in Modal */}
                {hasScarcity && (
                  <div className="pt-2 border-t border-stone-200/80 text-xs text-amber-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Chỉ còn {product.experimental.scarcity.stockRemaining} sản phẩm trong kho!</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-700">
                      <Eye className="w-3 h-3 text-amber-500" />
                      <span>{product.experimental.scarcity.viewers} người đang cùng xem</span>
                    </div>
                  </div>
                )}

                {/* Sneaking Notice in Modal */}
                {hasSneaking && (
                  <div className="pt-2 border-t border-stone-200/80 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Giá sản phẩm:</span>
                      <span>{formatPrice(product.salePrice)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>{shippingLabel}:</span>
                      <span>{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-dashed border-stone-300">
                      <span>Tổng tạm tính:</span>
                      <span className="text-rose-600">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Affiliate Link Preview & Editor */}
            <div className="p-3 bg-stone-100/70 rounded-xl text-xs space-y-1.5 border border-stone-200">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  Link tiếp thị liên kết Shopee
                </span>
                {!isEditingUrl ? (
                  <button
                    type="button"
                    onClick={handleStartEdit}
                    className="text-[#EE4D2D] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Sửa link</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                  >
                    <Check className="w-3 h-3" />
                    <span>Lưu</span>
                  </button>
                )}
              </div>

              {!isEditingUrl ? (
                <div className="font-mono text-[11px] text-stone-700 truncate bg-white p-1.5 rounded border border-stone-200">
                  {product.affiliateUrl}
                </div>
              ) : (
                <input
                  type="text"
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                  placeholder="Dán link affiliate Shopee của bạn vào đây..."
                  className="w-full font-mono text-[11px] p-1.5 bg-white border border-[#EE4D2D] rounded outline-none"
                  autoFocus
                />
              )}
            </div>

            {/* Modal CTA */}
            <button
              type="button"
              onClick={() => {
                onBuyClick(product, totalPrice);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold text-white bg-[#EE4D2D] hover:bg-[#d83f20] active:scale-98 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mua Ngay trên Shopee</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
