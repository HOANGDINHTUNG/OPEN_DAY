import { useNavigate } from "react-router-dom";

export function TechPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-x-hidden flex flex-col">
      <main className="pt-32 pb-20 px-4 md:px-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-deep-space text-white mb-6 shadow-[0_10px_30px_rgba(10,25,47,0.3)]">
            <span className="material-symbols-outlined text-5xl">memory</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-space mb-4">
            Thế Giới Công Nghệ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Từ những nền tảng lập trình cơ bản đến các xu hướng công nghệ tiên
            phong của tương lai.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-brand-red transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-red">
                code
              </span>{" "}
              Nền tảng Lập trình cơ bản
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Bước chân đầu tiên vào thế giới IT chính là hiểu được cách máy
              tính "suy nghĩ". Lập trình không chỉ là gõ code, mà là tư duy giải
              quyết vấn đề.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                <strong className="text-gray-800">
                  Cấu trúc dữ liệu & Giải thuật:
                </strong>{" "}
                Xương sống của mọi chương trình phần mềm.
              </li>
              <li>
                <strong className="text-gray-800">
                  Tư duy Logic (Logic Thinking):
                </strong>{" "}
                Rèn luyện não bộ để đưa ra giải pháp tối ưu.
              </li>
              <li>
                <strong className="text-gray-800">Ngôn ngữ Lập trình:</strong>{" "}
                C, C++, Java, Python - những công cụ đầu tiên của bạn.
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-blue-600 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">
                devices
              </span>{" "}
              Phát triển Ứng dụng (Web/App)
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Khi đã nắm vững cơ bản, bạn sẽ học cách tạo ra những sản phẩm thực
              tế mà hàng triệu người sử dụng mỗi ngày.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                <strong className="text-gray-800">Frontend:</strong> HTML, CSS,
                JavaScript, React, Vue.js. Xây dựng giao diện đẹp mắt.
              </li>
              <li>
                <strong className="text-gray-800">Backend:</strong> Node.js,
                Spring Boot, cơ sở dữ liệu (SQL, NoSQL). Xử lý dữ liệu ngầm.
              </li>
              <li>
                <strong className="text-gray-800">Mobile App:</strong> Flutter,
                React Native, Swift, Kotlin. Đưa công nghệ vào smartphone.
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-light rounded-2xl p-8 border-l-8 border-purple-600 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-2xl font-bold text-deep-space mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-purple-600">
                psychology
              </span>{" "}
              Trí tuệ Nhân tạo (AI) & Tương lai
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Công nghệ không ngừng tiến lên. AI và dữ liệu đang định hình lại
              toàn bộ ngành công nghiệp phần mềm toàn cầu.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>
                <strong className="text-gray-800">
                  Machine Learning & Deep Learning:
                </strong>{" "}
                Dạy máy tính tự học hỏi.
              </li>
              <li>
                <strong className="text-gray-800">Data Science:</strong> Biến
                những con số vô hồn thành chiến lược kinh doanh.
              </li>
              <li>
                <strong className="text-gray-800">Cloud Computing:</strong> AWS,
                Azure, Google Cloud. Đưa mọi thứ lên mây.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
          <button
            className="bg-gray-200 text-deep-space font-bold text-lg py-4 px-8 rounded-xl hover:bg-gray-300 transition-colors shadow flex items-center justify-center gap-2"
            onClick={() => navigate("/")}
          >
            <span className="material-symbols-outlined">arrow_back</span> Quay
            lại
          </button>
          <button
            className="bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow flex items-center justify-center gap-2"
            onClick={() => navigate("/soft-skills")}
          >
            Tiếp theo{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
