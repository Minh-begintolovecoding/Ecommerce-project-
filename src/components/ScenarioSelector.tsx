import React from 'react';
import { ScenarioType } from '../types';
import { FlaskConical, AlertCircle, Eye, ShieldCheck, DollarSign, Settings2, BarChart3, HelpCircle } from 'lucide-react';

interface ScenarioSelectorProps {
  currentScenario: ScenarioType;
  onScenarioChange: (scenario: ScenarioType) => void;
  isExperimentMode: boolean;
  onToggleExperimentMode: (enabled: boolean) => void;
  onOpenResearchModal: () => void;
  onOpenAffiliateConfig: () => void;
  totalClicksCount: number;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  currentScenario,
  onScenarioChange,
  isExperimentMode,
  onToggleExperimentMode,
  onOpenResearchModal,
  onOpenAffiliateConfig,
  totalClicksCount,
}) => {
  const scenarioDescriptions: Record<ScenarioType, { label: string; desc: string; icon: React.ReactNode }> = {
    control: {
      label: 'Control (Chuẩn)',
      desc: 'Hiển thị sản phẩm chuẩn, trung thực. Không có áp lực khan hiếm hay phụ phí ẩn.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    },
    scarcity: {
      label: 'Scarcity (Khan hiếm)',
      desc: 'Mô phỏng thông tin khan hiếm & tính cấp bách (số lượng tồn kho thấp, người đang xem).',
      icon: <Eye className="w-4 h-4 text-amber-600" />,
    },
    sneaking: {
      label: 'Sneaking (Phụ phí)',
      desc: 'Mô phỏng kỹ thuật cộng thêm phí vận chuyển/xử lý bổ sung vào tổng tiền khi xem giá.',
      icon: <DollarSign className="w-4 h-4 text-rose-600" />,
    },
    both: {
      label: 'Both (Kết hợp)',
      desc: 'Kết hợp cả yếu tố áp lực khan hiếm và phân rã tổng tiền kèm phụ phí ẩn mô phỏng.',
      icon: <AlertCircle className="w-4 h-4 text-purple-600" />,
    },
  };

  return (
    <section className="bg-white border-y border-stone-200/80 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Mode Title & Toggle */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EE4D2D]/10 text-[#EE4D2D]">
                <FlaskConical className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Experimental Scenario
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded bg-stone-100 text-stone-600">
                    UX Research
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 hidden sm:block">
                  Mô phỏng 4 điều kiện thử nghiệm tâm lý hành vi mua sắm e-commerce
                </p>
              </div>
            </div>

            {/* Experiment Mode Toggle */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <span className="text-xs text-stone-600 font-medium whitespace-nowrap">
                Chế độ thử nghiệm:
              </span>
              <button
                type="button"
                onClick={() => onToggleExperimentMode(!isExperimentMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:ring-offset-2 ${
                  isExperimentMode ? 'bg-[#EE4D2D]' : 'bg-stone-300'
                }`}
                aria-label="Bật/Tắt Experimental Mode"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isExperimentMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                {isExperimentMode ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>

          {/* Center: Scenario Selector Tabs (when ON) */}
          {isExperimentMode ? (
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              {(['control', 'scarcity', 'sneaking', 'both'] as ScenarioType[]).map((scenario) => {
                const isActive = currentScenario === scenario;
                return (
                  <button
                    key={scenario}
                    type="button"
                    onClick={() => onScenarioChange(scenario)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80 ring-1 ring-black/5'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {scenarioDescriptions[scenario].icon}
                    <span className="capitalize">{scenario}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-stone-500 italic bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
              Đang ở chế độ xem thông thường (Control). Bật &quot;ON&quot; để đổi kịch bản thử nghiệm.
            </div>
          )}

          {/* Right: Quick Research Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAffiliateConfig}
              title="Cài đặt link affiliate Shopee"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Cài link Affiliate</span>
            </button>

            <button
              type="button"
              onClick={onOpenResearchModal}
              title="Xem nhật ký & giải thích kịch bản UX"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5 text-stone-500" />
              <span>Log Click ({totalClicksCount})</span>
              <HelpCircle className="w-3 h-3 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Active Scenario Hint Badge */}
        {isExperimentMode && (
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-900">
                Kịch bản hiện tại: {scenarioDescriptions[currentScenario].label}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-500 text-[11px]">
                {scenarioDescriptions[currentScenario].desc}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono hidden md:inline">
              Mọi dữ liệu khan hiếm/phụ phí là mô phỏng nghiên cứu (Mock Simulation)
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
