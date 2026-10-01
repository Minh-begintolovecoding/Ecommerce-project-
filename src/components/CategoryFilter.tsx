import React from 'react';
import { CategoryType } from '../types';
import { 
  Shirt, 
  Layers, 
  Scissors, 
  Briefcase, 
  Backpack, 
  ShoppingBag, 
  Footprints, 
  Watch, 
  Sparkles,
  LayoutGrid
} from 'lucide-react';

interface CategoryFilterProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  categoryCounts: Record<CategoryType, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'Áo thun':
        return <Shirt className="w-4 h-4" />;
      case 'Áo sơ mi':
        return <Layers className="w-4 h-4" />;
      case 'Quần jean':
        return <Scissors className="w-4 h-4" />;
      case 'Quần kaki':
        return <Scissors className="w-4 h-4" />;
      case 'Áo khoác':
        return <Shirt className="w-4 h-4" />;
      case 'Balo':
        return <Backpack className="w-4 h-4" />;
      case 'Túi xách':
        return <ShoppingBag className="w-4 h-4" />;
      case 'Giày':
        return <Footprints className="w-4 h-4" />;
      case 'Phụ kiện':
        return <Watch className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <section id="categories" className="py-6 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Danh mục sản phẩm
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Chọn nhóm thời trang & phụ kiện bạn muốn săn deal giá tốt
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('Tất cả')}
            className="text-xs font-semibold text-[#EE4D2D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Xem tất cả ({categoryCounts['Tất cả'] || 0})</span>
          </button>
        </div>

        {/* Category Horizontal Scrolling Bar / Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-[#EE4D2D] text-white border-[#EE4D2D] shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-stone-500'}>
                  {getCategoryIcon(cat)}
                </span>
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200/70 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
