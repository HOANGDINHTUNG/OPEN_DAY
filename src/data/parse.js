const fs = require("fs");

const raw = fs.readFileSync("raw_data.txt", "utf8");

const lines = raw.split("\n");

let currentTopic = "";
let currentDiff = 1;
let questions = {
  nangLucSo: [],
  doVuiTrend: [],
  traLoiNgan: [],
};

let currentQ = null;

const topicMap = {
  "TOPIC 1": "nangLucSo",
  "TOPIC 2": "doVuiTrend",
  "TOPIC 3": "traLoiNgan",
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (line.startsWith("TOPIC 1")) currentTopic = "nangLucSo";
  if (line.startsWith("TOPIC 2")) currentTopic = "doVuiTrend";
  if (line.startsWith("TOPIC 3")) currentTopic = "traLoiNgan";

  if (line.startsWith("CẤP ĐỘ: DỄ")) currentDiff = 1;
  if (line.startsWith("CẤP ĐỘ: TRUNG BÌNH")) currentDiff = 2;
  if (line.startsWith("CẤP ĐỘ: KHÁ")) currentDiff = 3;
  if (line.startsWith("CẤP ĐỘ: KHÓ")) currentDiff = 4;

  if (line.startsWith("Câu ")) {
    if (currentQ) {
      questions[currentTopic].push(currentQ);
    }
    const id = line.split(" ")[1];
    currentQ = {
      id: id,
      question: "",
      answer: "",
      difficulty: currentDiff,
    };
    if (currentTopic !== "traLoiNgan") {
      currentQ.options = [];
    }

    // next lines are question until A. B. C. D. or "Đáp án:"
    let j = i + 1;
    let qText = [];
    while (j < lines.length) {
      const nextL = lines[j].trim();
      if (!nextL) {
        j++;
        continue;
      }
      if (
        nextL.startsWith("A.") ||
        nextL.startsWith("Đáp án") ||
        nextL.startsWith("Câu ")
      )
        break;
      qText.push(nextL);
      j++;
    }
    currentQ.question = qText.join("\n");
    i = j - 1;
    continue;
  }

  if (currentQ) {
    if (line.match(/^[A-D]\. /)) {
      if (currentQ.options) {
        currentQ.options.push(line);
      }
    } else if (line.startsWith("Đáp án:")) {
      currentQ.answer = line.replace("Đáp án:", "").trim();
    } else if (line.startsWith("Đáp án gợi ý:")) {
      currentQ.answer = line.replace("Đáp án gợi ý:", "").trim();
    } else if (
      line.startsWith("Ghi chú:") ||
      line.startsWith("Nguồn biên soạn")
    ) {
      currentQ.explanation = (currentQ.explanation || "") + line + "\n";
    }
  }
}
if (currentQ) {
  questions[currentTopic].push(currentQ);
}

// Generate TS
let tsContent =
  "export const questionsData = " +
  JSON.stringify(questions, null, 2) +
  ";\n\n";

tsContent += `export function getRandomizedGameSet(
  count: number = 7,
  topicKey: 'all' | 'nangLucSo' | 'doVuiTrend' | 'traLoiNgan' = 'all'
): any[] {
  let allPools: any[] = [];
  
  if (topicKey === 'all' || topicKey === 'nangLucSo') {
    allPools = [...allPools, ...(questionsData.nangLucSo || [])];
  }
  if (topicKey === 'all' || topicKey === 'doVuiTrend') {
    allPools = [...allPools, ...(questionsData.doVuiTrend || [])];
  }
  if (topicKey === 'all' || topicKey === 'traLoiNgan') {
    allPools = [...allPools, ...(questionsData.traLoiNgan || [])];
  }

  // 4 mức độ: 1 (Dễ), 2 (TB), 3 (Khá), 4 (Khó)
  const diff1 = allPools.filter((q) => q.difficulty === 1);
  const diff2 = allPools.filter((q) => q.difficulty === 2);
  const diff3 = allPools.filter((q) => q.difficulty === 3);
  const diff4 = allPools.filter((q) => q.difficulty === 4);

  const shuffle = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

  shuffle(diff1);
  shuffle(diff2);
  shuffle(diff3);
  shuffle(diff4);

  // Requirement: 7 nấc, bám sát mức độ.
  // Gợi ý:
  // Nấc 1, 2: Dễ (2 câu)
  // Nấc 3, 4: Trung Bình (2 câu)
  // Nấc 5, 6: Khá (2 câu)
  // Nấc 7: Khó (1 câu)
  const selected = [
    ...diff1.slice(0, 2),
    ...diff2.slice(0, 2),
    ...diff3.slice(0, 2),
    ...diff4.slice(0, 1),
  ];

  // Fallback map in case pools are drained
  let remaining = [
    ...diff1.slice(2),
    ...diff2.slice(2),
    ...diff3.slice(2),
    ...diff4.slice(1)
  ];
  shuffle(remaining);
  
  while (selected.length < count && remaining.length > 0) {
    selected.push(remaining.shift());
  }

  return selected.slice(0, count);
}
`;

fs.writeFileSync("questions.ts", tsContent);
console.log("Generated questions.ts");
