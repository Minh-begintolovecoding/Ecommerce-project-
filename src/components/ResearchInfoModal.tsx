import React from 'react';
import { ExperimentClickLog, ScenarioType } from '../types';
import { X, FlaskConical, Download, Trash2, CheckCircle, AlertTriangle, Truck, Eye, ShieldCheck } from 'lucide-react';

interface ResearchInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ExperimentClickLog[];
  onClearLogs: () => void;
  currentScenario: ScenarioType;
}

export const ResearchInfoModal: React.FC<ResearchInfoModalProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  currentScenario,
}) => {
  if (!isOpen) return null;

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ux_experiment_clicks_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getScenarioBadge = (sc: ScenarioType) => {
    switch (sc) {
      case 'control':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Control</span>;
      case 'scarcity':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Scarcity</span>;
      case 'sneaking':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">Sneaking</span>;
      case 'both':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Both</span>;
    }
  };

  // Aggregated click count by scenario
  const clicksByScenario = logs.reduce<Record<ScenarioType, number>>(
    (acc, log) => {
      acc[log.scenario] = (acc[log.scenario] || 0) + 1;
      return acc;
    },
    { control: 0, scarcity: 0, sneaking: 0, both: 0 }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EE4D2D]/10 text-[#EE4D2D]">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                Experimental UX & E-commerce Research Center
              </h3>
              <p className="text-xs text-stone-500">
                Tài liệu & Nhật ký tương tác 4 kịch bản thử nghiệm hành vi người dùng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Research Matrix Table */}
          <div>
            <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <span>Bảng phân loại 4 Điều kiện Nghiên cứu</span>
              <span className="text-xs font-normal text-stone-500">
                (Đang kích hoạt: <b className="capitalize text-[#EE4D2D]">{currentScenario}</b>)
              </span>
            </h4>
            <div className="border border-stone-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="p-2.5">Scenario</th>
                    <th className="p-2.5">Thông tin Khan hiếm (Scarcity)</th>
                    <th className="p-2.5">Trình bày Phụ phí (Sneaking)</th>
                    <th className="p-2.5 text-right">Clicks ghi nhận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-600">
                  <tr className={currentScenario === 'control' ? 'bg-emerald-50/50 font-medium' : ''}>
                    <td className="p-2.5 font-bold text-stone-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Control
                    </td>
                    <td className="p-2.5 text-stone-500">Không hiển thị</td>
                    <td className="p-2.5 text-stone-500">Không có phụ phí phát sinh</td>
                    <td className="p-2.5 text-right font-mono font-bold text-stone-800">
                      {clicksByScenario.control}
                    </td>
                  </tr>
                  <tr className={currentScenario === 'scarcity' ? 'bg-amber-50/50 font-medium' : ''}>
                    <td className="p-2.5 font-bold text-stone-900 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-600" />
                      Scarcity
                    </td>
                    <td className="p-2.5 text-amber-900">
                      Có (&quot;Chỉ còn X cái&quot;, &quot;Y người đang xem&quot;)
                    </td>
                    <td className="p-2.5 text-stone-500">Không có phụ phí phát sinh</td>
                    <td className="p-2.5 text-right font-mono font-bold text-stone-800">
                      {clicksByScenario.scarcity}
                    </td>
                  </tr>
                  <tr className={currentScenario === 'sneaking' ? 'bg-rose-50/50 font-medium' : ''}>
                    <td className="p-2.5 font-bold text-stone-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-rose-600" />
                      Sneaking
                    </td>
                    <td className="p-2.5 text-stone-500">Không hiển thị</td>
                    <td className="p-2.5 text-rose-900">
                      Có (Tự động cộng Premium Shipping vào tổng)
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-stone-800">
                      {clicksByScenario.sneaking}
                    </td>
                  </tr>
                  <tr className={currentScenario === 'both' ? 'bg-purple-50/50 font-medium' : ''}>
                    <td className="p-2.5 font-bold text-stone-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-purple-600" />
                      Both
                    </td>
                    <td className="p-2.5 text-purple-900">Có (Số lượng tồn + Người xem)</td>
                    <td className="p-2.5 text-purple-900">Có (Cộng Premium Shipping)</td>
                    <td className="p-2.5 text-right font-mono font-bold text-stone-800">
                      {clicksByScenario.both}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ethics & Mock Data Notice */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Cam kết đạo đức trong thiết kế nghiên cứu (Ethical Disclosure)</span>
            </div>
            <p className="text-blue-800 leading-relaxed">
              Mọi thông báo số lượng tồn kho (ví dụ: &quot;Chỉ còn 3 sản phẩm&quot;), số người đang xem, và phụ phí vận chuyển bổ sung đều được cố định dưới dạng <b>mock/experimental data</b>. Hệ thống không tạo áp lực thanh toán gian dối, không thu tiền thật và liên kết Shopee mở trực tiếp trang sản phẩm/tìm kiếm chính thống.
            </p>
          </div>

          {/* Live Click Telemetry Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-stone-900">
                Nhật ký tương tác nút &quot;Mua Ngay&quot; ({logs.length} lượt click)
              </h4>
              <div className="flex items-center gap-2">
                {logs.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={exportJSON}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Xuất JSON
                    </button>
                    <button
                      type="button"
                      onClick={onClearLogs}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Xóa Log
                    </button>
                  </>
                )}
              </div>
            </div>

            {logs.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-stone-300 rounded-xl text-stone-400 text-xs">
                Chưa có lượt click nào vào nút &quot;Mua Ngay&quot;. Hãy thử nhấn vào các sản phẩm ở các kịch bản khác nhau để ghi nhận dữ liệu!
              </div>
            ) : (
              <div className="max-h-56 overflow-y-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead className="bg-stone-100 text-stone-600 sticky top-0 border-b border-stone-200">
                    <tr>
                      <th className="p-2">Thời gian</th>
                      <th className="p-2">Sản phẩm</th>
                      <th className="p-2">Kịch bản</th>
                      <th className="p-2 text-right">Giá hiển thị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {logs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="p-2 text-stone-500 whitespace-nowrap">{log.timestamp}</td>
                        <td className="p-2 font-medium text-stone-800">{log.productName}</td>
                        <td className="p-2">{getScenarioBadge(log.scenario)}</td>
                        <td className="p-2 text-right text-stone-900 font-bold">
                          {new Intl.NumberFormat('vi-VN').format(log.calculatedPrice)}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            Đóng bảng nghiên cứu
          </button>
        </div>
      </div>
    </div>
  );
};
