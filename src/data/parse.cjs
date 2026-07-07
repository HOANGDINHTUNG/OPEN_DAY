const fs = require("fs");
const path = require("path");

const rawText = fs.readFileSync(
  path.join(__dirname, "raw_questions.txt"),
  "utf8",
);

const parts = rawText.split(
  /ĐỐ VUI LIÊN TREND SAU KÌ THI THPT QG|15 câu hỏi trả lời ngắn – bản mặn hơn 😆/,
);

function parseMcq(text) {
  const questions = [];
  const blocks = text.split("________________________________________");

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);
    if (lines.length === 0) continue;

    let q_num = "";
    let q_text = [];
    let options = [];
    let answer = "";
    let explanation = [];
    let mode = "q_text";

    for (const line of lines) {
      if (line.startsWith("Câu ")) {
        q_num = line;
      } else if (/^[A-Z]\./.test(line)) {
        options.push(line);
      } else if (line.startsWith("Đáp án:")) {
        answer = line.split(":", 2)[1].trim();
        mode = "explanation";
      } else if (mode === "q_text") {
        q_text.push(line);
      } else if (mode === "explanation") {
        explanation.push(line);
      }
    }

    if (q_num) {
      questions.push({
        id: q_num,
        question: q_text.join("\n"),
        options,
        answer,
        explanation:
          explanation.length > 0 ? explanation.join("\n") : undefined,
      });
    }
  }
  return questions;
}

function parseShort(text) {
  const questions = [];
  const blocks = text.split("________________________________________");

  for (const block of blocks) {
    const lines = block
      .trim()
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);
    if (lines.length === 0) continue;

    let q_num = "";
    let q_text = [];
    let answer = "";
    let explanation = [];
    let mode = "q_text";

    for (const line of lines) {
      if (line.startsWith("Câu ")) {
        q_num = line;
        if (q_num.includes("CÂU CHỐT")) q_num = "Câu 15";
      } else if (
        line.startsWith("Đáp án:") ||
        line.startsWith("Đáp án gợi ý:")
      ) {
        answer = line.split(":", 2)[1].trim();
        mode = "explanation";
      } else if (mode === "q_text") {
        q_text.push(line);
      } else if (mode === "explanation") {
        explanation.push(line);
      }
    }

    if (q_num) {
      questions.push({
        id: q_num,
        question: q_text.join("\n"),
        answer,
        explanation:
          explanation.length > 0 ? explanation.join("\n") : undefined,
      });
    }
  }
  return questions;
}

const data = {
  nangLucSo: parseMcq(parts[0] || ""),
  doVuiTrend: parseMcq(parts[1] || ""),
  traLoiNgan: parseShort(parts[2] || ""),
};

const tsContent = `export const questionsData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "questions.ts"), tsContent, "utf8");
console.log("Written questions.ts successfully.");
