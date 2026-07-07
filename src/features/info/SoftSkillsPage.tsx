import { useNavigate } from "react-router-dom";

export function SoftSkillsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-x-hidden flex flex-col">
      <main className="pt-32 pb-20 px-4 md:px-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-deep-space text-white mb-6 shadow-[0_10px_30px_rgba(10,25,47,0.3)]">
            <span className="material-symbols-outlined text-5xl">
              psychology
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-space mb-4">
            Tầm Quan Trọng Của Kỹ Năng Mềm
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Code giỏi thôi là chưa đủ. Kỹ năng mềm chính là bệ phóng giúp bạn
            tiến xa trong sự nghiệp công nghệ.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-brand-orange transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-orange">
                forum
              </span>{" "}
              Kỹ năng Giao tiếp (Communication)
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Là kỹ sư IT, bạn không chỉ giao tiếp với máy tính mà còn phải trao
              đổi liên tục với khách hàng, quản lý dự án, và các thành viên
              trong đội.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                Lắng nghe và thấu hiểu yêu cầu (Requirements) một cách chính
                xác.
              </li>
              <li>
                Trình bày ý tưởng kỹ thuật một cách dễ hiểu cho người không
                chuyên.
              </li>
              <li>Kỹ năng viết Email, báo cáo chuyên nghiệp.</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-green-600 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600">
                groups
              </span>{" "}
              Kỹ năng Làm việc Nhóm (Teamwork)
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Không một phần mềm lớn nào được tạo ra bởi một người duy nhất.
              Tinh thần đồng đội là yếu tố cốt lõi của mọi dự án thành công.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Cộng tác linh hoạt theo mô hình Agile/Scrum.</li>
              <li>Tôn trọng ý kiến khác biệt và xử lý xung đột nội bộ.</li>
              <li>
                San sẻ khối lượng công việc và hỗ trợ nhau gỡ lỗi
                (Pair-programming).
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-teal-600 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-teal-600">
                lightbulb
              </span>{" "}
              Kỹ năng Giải quyết Vấn đề
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Lập trình thực chất là quá trình tìm kiếm và sửa lỗi không ngừng
              nghỉ. Người giỏi nhất là người giữ được cái đầu lạnh khi hệ thống
              sập.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Phân tích nguyên nhân cốt lõi (Root Cause Analysis).</li>
              <li>
                Tư duy phản biện (Critical Thinking) để tìm ra giải pháp tối ưu.
              </li>
              <li>
                Khả năng tự nghiên cứu và thích nghi nhanh với công nghệ mới.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <button
            className="bg-gray-200 text-deep-space font-bold text-lg py-4 px-8 rounded-xl hover:bg-gray-300 transition-colors shadow flex items-center gap-2"
            onClick={() => navigate("/tech")}
          >
            <span className="material-symbols-outlined">arrow_back</span> Quay
            lại
          </button>
          <button
            className="bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow flex items-center gap-2"
            onClick={() => navigate("/digital")}
          >
            Tiếp theo{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
