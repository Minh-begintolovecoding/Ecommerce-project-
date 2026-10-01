import React, { useState } from 'react';
import { X, Link2, Check, Sparkles, RefreshCw } from 'lucide-react';

interface AffiliateConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGlobalUrl: (prefix: string) => void;
  onResetDefaultUrls: () => void;
}

export const AffiliateConfigModal: React.FC<AffiliateConfigModalProps> = ({
  isOpen,
  onClose,
  onApplyGlobalUrl,
  onResetDefaultUrls,
}) => {
  const [affiliateTag, setAffiliateTag] = useState('');
  const [appliedNotice, setAppliedNotice] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (affiliateTag.trim()) {
      onApplyGlobalUrl(affiliateTag.trim());
      setAppliedNotice(true);
      setTimeout(() => {
        setAppliedNotice(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200">
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#EE4D2D]" />
            <h3 className="font-bold text-stone-900 text-sm">
              Cài đặt Link Affiliate Shopee
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleApply} className="p-5 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Dán đường dẫn affiliate rút gọn hoặc mã giới thiệu Shopee của bạn. Hệ thống sẽ cập nhật tự động toàn bộ nút <b>&quot;Mua Ngay&quot;</b> trên website.
          </p>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Link hoặc tiền tố Affiliate (Ví dụ: https://shope.ee/xyz hoặc https://shopee.vn/universal)
            </label>
            <input
              type="text"
              value={affiliateTag}
              onChange={(e) => setAffiliateTag(e.target.value)}
              placeholder="https://shope.ee/affiliate_deal_hot"
              className="w-full text-xs font-mono p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#EE4D2D] focus:border-[#EE4D2D] outline-none"
            />
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
            <span className="font-semibold text-stone-700 block">Quy tắc liên kết:</span>
            <p>• Khi click &quot;Mua Ngay&quot;, trình duyệt sẽ thực hiện lệnh: <code className="text-[#EE4D2D] font-mono">window.open(affiliateUrl, &quot;_blank&quot;)</code></p>
            <p>• Hoàn toàn không yêu cầu người mua đăng nhập hay nhập thông tin cá nhân.</p>
          </div>

          {appliedNotice && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Đã cập nhật liên kết thành công!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                onResetDefaultUrls();
                onClose();
              }}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#EE4D2D] hover:bg-[#d83f20] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Áp dụng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
