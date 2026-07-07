import { useState, useEffect } from "react";
import {
  UploadCloud,
  X,
  Gift,
  RefreshCcw,
  Download,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import {
  getInventory,
  updateInventoryStock,
  InventoryItem,
} from "@/utils/storage";

export function PrizeManagementPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    setInventory(getInventory());
  }, []);

  const handleUpdateStock = (id: string, delta: number) => {
    updateInventoryStock(id, delta);
    setInventory(getInventory());
  };

  const questions = [
    {
      topic: "Security",
      level: "Hard",
      type: "Multiple Choice",
      q: "What is the primary vulnerability in...",
      id: "PRZ-001",
    },
    {
      topic: "Cloud",
      level: "Medium",
      type: "True/False",
      q: "S3 buckets are private by default...",
      id: "PRZ-042",
    },
    {
      topic: "AI/ML",
      level: "Hard",
      type: "Code Snippet",
      q: "Identify the tensor shape mismatch...",
      id: "PRZ-001",
    },
    {
      topic: "Basics",
      level: "Easy",
      type: "Multiple Choice",
      q: "Which tag is used for hyperlin...",
      id: "PRZ-120",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6 mt-8">
        <div>
          <h2 className="text-3xl font-bold text-deep-space mb-2">
            Quản lý Dữ liệu
          </h2>
          <p className="text-gray-500 font-medium">
            Nhập xuất bộ câu hỏi và kiểm soát kho quà thưởng.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw size={16} /> Làm mới
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Download size={16} /> Xuất Dữ liệu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Import Section */}
        <GlassPanel className="p-6 flex flex-col h-full bg-white/70 border-gray-200">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <UploadCloud className="text-primary" />
            <h3 className="font-bold text-lg text-deep-space">
              Nhập Dữ liệu (Import)
            </h3>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 mb-6 hover:border-primary transition-colors cursor-pointer group">
            <UploadCloud className="text-gray-400 group-hover:text-primary transition-colors mb-4 w-10 h-10" />
            <p className="font-bold text-deep-space mb-2">
              Kéo thả file vào đây
            </p>
            <p className="text-xs text-gray-400 mb-6 text-center">
              Hỗ trợ: .xlsx, .csv (Max 10MB)
            </p>
            <Button variant="outline" size="sm">
              Mở thư mục
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 truncate">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-semibold truncate text-deep-space">
                questions_q3_v2.xlsx
              </span>
            </div>
            <button className="text-error hover:bg-error/10 p-1 rounded transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>

          <Button className="w-full">Tiến hành Nhập liệu</Button>
        </GlassPanel>

        {/* Right Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Inventory Table */}
          <GlassPanel className="p-0 overflow-hidden flex flex-col bg-white/70 border-gray-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Gift className="text-brand-red" />
                <h3 className="font-bold text-lg text-deep-space">
                  Kho Quà tặng (Inventory)
                </h3>
              </div>
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                Live Sync
              </span>
            </div>
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Tên Quà</th>
                    <th className="py-3 px-4 text-right">Tồn kho</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {inventory.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs border rounded ${item.tagColor}`}
                        >
                          {item.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-deep-space font-semibold">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleUpdateStock(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:text-deep-space hover:border-brand-red transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            className={`font-bold text-lg w-8 text-center ${item.color}`}
                          >
                            {item.stock.toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() => handleUpdateStock(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:text-deep-space hover:border-green-500 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>

          {/* Question Bank Table */}
          <GlassPanel className="p-0 overflow-hidden flex flex-col flex-1 min-h-[300px] bg-white/70 border-gray-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-lg text-deep-space">
                Ngân hàng Câu hỏi
              </h3>
              <div className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                243 Câu hỏi
              </div>
            </div>
            <div className="overflow-auto custom-scrollbar flex-1 p-2">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="text-gray-500 text-xs uppercase tracking-wider sticky top-0 bg-gray-50 z-10 shadow-sm border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Topic</th>
                    <th className="py-3 px-4">Độ Khó</th>
                    <th className="py-3 px-4">Loại</th>
                    <th className="py-3 px-4">Trích đoạn</th>
                    <th className="py-3 px-4">Prize ID</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600 font-medium">
                  {questions.map((q, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-primary font-semibold">
                        {q.topic}
                      </td>
                      <td className="py-3 px-4 text-deep-space font-semibold">
                        {q.level}
                      </td>
                      <td className="py-3 px-4">{q.type}</td>
                      <td className="py-3 px-4 truncate max-w-[200px]">
                        {q.q}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs">{q.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
