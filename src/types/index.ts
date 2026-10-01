export type ScenarioType = 'control' | 'scarcity' | 'sneaking' | 'both';

export type CategoryType = 
  | 'Tất cả'
  | 'Áo thun'
  | 'Áo sơ mi'
  | 'Quần jean'
  | 'Quần kaki'
  | 'Áo khoác'
  | 'Balo'
  | 'Túi xách'
  | 'Giày'
  | 'Phụ kiện';

export type BadgeType = 'Deal hot' | 'Bán chạy' | 'Giảm sâu';

export interface ExperimentalData {
  scarcity: {
    stockRemaining: number;
    viewers: number;
  };
  sneaking: {
    shippingFee: number;
    feeLabel?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  badge: BadgeType;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  brand?: string;
  description: string;
  experimental: ExperimentalData;
}

export interface ExperimentClickLog {
  timestamp: string;
  productId: string;
  productName: string;
  scenario: ScenarioType;
  affiliateUrl: string;
  calculatedPrice: number;
}
