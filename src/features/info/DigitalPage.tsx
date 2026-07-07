import { useNavigate } from "react-router-dom";

export function DigitalPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-x-hidden flex flex-col">
      <main className="pt-32 pb-20 px-4 md:px-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-deep-space text-white mb-6 shadow-[0_10px_30px_rgba(10,25,47,0.3)]">
            <span className="material-symbols-outlined text-5xl">
              business_center
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-space mb-4">
            Năng Lực Số & Môi Trường DN
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hội nhập nhanh chóng vào văn hóa doanh nghiệp IT và làm chủ xu thế
            Chuyển đổi số toàn cầu.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-cyan-500 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-cyan-500">
                public
              </span>{" "}
              Tư duy Chuyển Đổi Số (Digital Transformation)
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Chuyển đổi số không chỉ là áp dụng công nghệ mới, mà là sự thay
              đổi hoàn toàn về tư duy quản trị và vận hành doanh nghiệp.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                Hiểu rõ vòng đời phát triển phần mềm (SDLC) trong doanh nghiệp.
              </li>
              <li>
                Sử dụng thành thạo các bộ công cụ số: Jira, Git, Trello,
                Slack...
              </li>
              <li>
                Nhận thức về bảo mật thông tin và an toàn dữ liệu (Cyber
                Security).
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-brand-red transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-red">
                domain
              </span>{" "}
              Văn hóa Doanh Nghiệp IT chuẩn Nhật
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Rikkeisoft và Rikkei Edu tự hào mang đến môi trường làm việc đậm
              chất Nhật Bản: Chuyên nghiệp, Kỷ luật và Tôn trọng.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                <strong className="text-gray-800">Ho-Ren-So:</strong> Kỹ năng
                Báo cáo (Hokoku) - Liên lạc (Renraku) - Bàn bạc (Sodan) cực kỳ
                quan trọng.
              </li>
              <li>
                <strong className="text-gray-800">5S:</strong> Sàng lọc, Sắp
                xếp, Sạch sẽ, Săn sóc, Sẵn sàng tại nơi làm việc.
              </li>
              <li>
                <strong className="text-gray-800">Kaizen:</strong> Tinh thần cải
                tiến liên tục không ngừng nghỉ.
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-amber-500 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-500">
                trending_up
              </span>{" "}
              Định Hướng và Lộ Trình Phát Triển
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Tại Rikkei Edu, sinh viên được trang bị không chỉ kiến thức mà còn
              là định hướng rõ ràng cho tương lai.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                Cơ hội thực tập và làm việc ngay tại Rikkeisoft sau khi tốt
                nghiệp.
              </li>
              <li>
                Lộ trình phát triển đa dạng: Developer ➔ Team Leader ➔ Project
                Manager / Solution Architect.
              </li>
              <li>
                Giao lưu, làm việc với các đối tác và khách hàng lớn từ Nhật
                Bản, Mỹ, Châu Âu.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
          <button
            className="bg-gray-200 text-deep-space font-bold text-lg py-4 px-6 md:px-8 rounded-xl hover:bg-gray-300 transition-colors shadow flex items-center gap-2"
            onClick={() => navigate("/soft-skills")}
          >
            <span className="material-symbols-outlined">arrow_back</span> Trang
            trước
          </button>
          <button
            className="bg-white border-2 border-deep-space text-deep-space font-bold text-lg py-4 px-6 md:px-8 rounded-xl hover:bg-gray-50 transition-colors shadow flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <span className="material-symbols-outlined">home</span> Trang chủ
          </button>
        </div>
      </main>
    </div>
  );
}
