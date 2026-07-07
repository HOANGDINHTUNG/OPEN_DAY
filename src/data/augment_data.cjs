
const fs = require("fs");
const path = require("path");

function getOriginalData() {
    const tsCode = fs.readFileSync(path.join(__dirname, "questions.ts"), "utf8");
    const jsonStr = tsCode.replace("export const questionsData = ", "").replace(/;\s*$/, "");
    return JSON.parse(jsonStr);
}

const data = getOriginalData();

// Add difficulty to existing ones (heuristic)
data.nangLucSo = data.nangLucSo.map((q, i) => {
    let diff = 1; // easy
    if (i > 10 && i <= 25) diff = 2; // medium
    if (i > 25) diff = 3; // hard
    return { ...q, difficulty: diff };
});

data.doVuiTrend = data.doVuiTrend.map((q, i) => {
    let diff = 1;
    if (i > 6 && i <= 15) diff = 2;
    if (i > 15) diff = 3;
    return { ...q, difficulty: diff };
});

data.traLoiNgan = data.traLoiNgan.map((q, i) => {
    let diff = 1;
    if (i > 4 && i <= 9) diff = 2;
    if (i > 9) diff = 3;
    return { ...q, difficulty: diff };
});

// New hard questions
const newHardNLS = [
    {
        id: "Câu H1",
        question: "Ðâu là nguy co an ninh l?n nh?t khi s? d?ng Deepfake trong môi tru?ng doanh nghi?p?",
        options: [
            "A. Làm gi?m ch?t lu?ng hình ?nh video call",
            "B. K? gian gi? m?o c?p trên d? yêu c?u chuy?n ti?n ho?c can thi?p thông tin m?t",
            "C. Chi?m nhi?u dung lu?ng luu tr? trên cloud",
            "D. Làm tang chi phí di?n nang c?a server"
        ],
        answer: "B",
        explanation: "Deepfake fraud is highly critical.",
        difficulty: 3
    },
    {
        id: "Câu H2",
        question: "Co ch? Zero Trust trong b?o m?t nghia là gì?",
        options: [
            "A. Không tin b?t k? ai, luôn yêu c?u xác th?c và ?y quy?n ? m?i bu?c",
            "B. Tin tuy?t d?i nhân viên n?i b?, ch? phòng ch?ng bên ngoài",
            "C. Ðóng b?ng d? li?u vinh vi?n",
            "D. H? th?ng t? d?ng xóa m?i m?t kh?u"
        ],
        answer: "A",
        explanation: "Zero Trust = Never trust, always verify.",
        difficulty: 3
    },
    {
        id: "Câu H3",
        question: "Lo?i mã d?c Ransomware thu?ng ho?t d?ng theo phuong th?c nào?",
        options: [
            "A. ?n thông tin thu m?c và d?i tên file",
            "B. Tr?m tài kho?n m?ng xã h?i d? dang tin rác",
            "C. Làm quá t?i h? th?ng m?ng (DDoS)",
            "D. Mã hóa toàn b? d? li?u quan tr?ng và t?ng ti?n ngu?i dùng d? l?y khóa gi?i mã"
        ],
        answer: "D",
        explanation: "Ransomware encrypts and asks for ransom.",
        difficulty: 3
    }
];

const newHardTrend = [
    {
        id: "Câu H4",
        question: "Khi m?t bài hát ho?c c?m t? b? viral trên TikTok và b? các brand l?m d?ng quá dà, thu?t ng? marketing thu?ng dùng d? ch? hi?n tu?ng này là gì?",
        options: [
            "A. Trend Fatigue (Bão hòa / M?t m?i vì Trend)",
            "B. Trend Surfing",
            "C. Content Pillar",
            "D. Viral Loop"
        ],
        answer: "A",
        explanation: "Trend fatigue refers to overuse.",
        difficulty: 3
    },
    {
        id: "Câu H5",
        question: "Trong van hóa gen Z, khái ni?m Delulu is the solulu mang ý nghia châm bi?m v? vi?c gì?",
        options: [
            "A. S?ng tích c?c thái quá d?n m?c ?o tu?ng d? d?i phó v?i th?c t?i khó khan",
            "B. Làm vi?c c?t l?c d? ki?m th?t nhi?u ti?n",
            "C. An ng? di?u d?, gi? gìn s?c kh?e",
            "D. Tránh xa hoàn toàn m?ng xã h?i"
        ],
        answer: "A",
        explanation: "Delusional is the solution.",
        difficulty: 3
    }
];

const newHardShort = [
    {
        id: "Câu H6",
        question: "M?t công ty công ngh? v?a tr?i qua kh?ng ho?ng truy?n thông vì rò r? d? li?u (Data Breach). C?m t? nào b?t d?u b?ng ch? C nói lên kh? nang ch?ng ch?u và ph?c h?i c?a h??",
        answer: "Cyber Resilience",
        explanation: "S?c b?t/kh? nang ph?c h?i không gian m?ng.",
        difficulty: 3
    },
    {
        id: "Câu H7",
        question: "Thu?t ng? 2 ch? cái dùng chung trong qu?n tr? d? án, nh?m minh h?a s? linh ho?t, thay d?i và t?i uu vòng l?p liên t?c, thay vì di theo m?t k? ho?ch c?ng ng?c (Waterfall)?",
        answer: "Agile",
        explanation: "Phuong pháp Agile.",
        difficulty: 3
    }
];

data.nangLucSo.push(...newHardNLS);
data.doVuiTrend.push(...newHardTrend);
data.traLoiNgan.push(...newHardShort);

const tsContent = `export const questionsData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "questions.ts"), tsContent, "utf8");
console.log("Updated questions.ts with difficulties and new hard questions!");

