const fs = require("fs");

const content = fs.readFileSync("raw_questions.txt", "utf-8");
const lines = content.split("\n");

const questionsData = {
  nangLucSo: [],
  doVuiTrend: [],
  tracNghiemNhanh: [],
  tanSinhVien: [],
};

let currentTopic = "";
let currentDifficulty = 1;
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (line.startsWith("TOPIC 1")) {
    currentTopic = "nangLucSo";
    currentQ = null;
  } else if (line.startsWith("TOPIC 2")) {
    currentTopic = "doVuiTrend";
    currentQ = null;
  } else if (line.startsWith("TOPIC 3")) {
    currentTopic = "tracNghiemNhanh";
    currentQ = null;
  } else if (line.startsWith("TOPIC 4")) {
    currentTopic = "tanSinhVien";
    currentQ = null;
  } else if (line.includes("CẤP ĐỘ: DỄ")) currentDifficulty = 1;
  else if (line.includes("CẤP ĐỘ: TRUNG BÌNH")) currentDifficulty = 2;
  // Need exact matching for KHÓ vs KHÁ because "KHÓ" and "KHÁ" are distinct.
  else if (line.startsWith("CẤP ĐỘ: KHÁ")) currentDifficulty = 3;
  else if (line.startsWith("CẤP ĐỘ: KHÓ")) currentDifficulty = 4;
  else if (line.startsWith("Câu ")) {
    if (currentQ && currentTopic) {
      questionsData[currentTopic].push(currentQ);
    }
    const idMatch = line.match(/^Câu\s+([A-Z0-9\-]+)/);
    const id = idMatch
      ? idMatch[1]
      : `ID-${Math.random().toString(36).substring(7)}`;
    currentQ = {
      id,
      question: "",
      answer: "",
      difficulty: currentDifficulty,
      options: [],
    };
  } else if (currentQ) {
    if (line.match(/^[A-D]\.\s/)) {
      currentQ.options.push(line.replace(/^[A-D]\.\s/, "").trim());
    } else if (line.startsWith("Đáp án:")) {
      currentQ.answer = line.replace("Đáp án:", "").trim();
    } else if (line.startsWith("Ghi chú:") || line.startsWith("Nguồn")) {
      currentQ.explanation =
        (currentQ.explanation ? currentQ.explanation + " " : "") + line;
    } else if (currentQ.options.length === 0 && !currentQ.answer) {
      currentQ.question += (currentQ.question ? "\n" : "") + line;
    } else if (currentQ.answer) {
      currentQ.explanation =
        (currentQ.explanation ? currentQ.explanation + " " : "") + line;
    }
  }
}
if (currentQ && currentTopic) {
  questionsData[currentTopic].push(currentQ);
}

fs.writeFileSync(
  "parsed_questions.json",
  JSON.stringify(questionsData, null, 2),
);
console.log("Saved to parsed_questions.json");
