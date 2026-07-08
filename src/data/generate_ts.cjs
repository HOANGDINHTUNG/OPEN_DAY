const fs = require("fs");
const data = require("./parsed_questions.json");

const tsContent = `export const questionsData = ${JSON.stringify(data, null, 2)};

export function getRandomizedGameSet(
  count: number = 7,
  topicKey: "all" | "nangLucSo" | "doVuiTrend" | "tracNghiemNhanh" | "tanSinhVien" = "all"
): any[] {
  let allPools: any[] = [];

  if (topicKey === "all" || topicKey === "nangLucSo") {
    allPools = [...allPools, ...(questionsData.nangLucSo || [])];
  }
  if (topicKey === "all" || topicKey === "doVuiTrend") {
    allPools = [...allPools, ...(questionsData.doVuiTrend || [])];
  }
  if (topicKey === "all" || topicKey === "tracNghiemNhanh") {
    allPools = [...allPools, ...(questionsData.tracNghiemNhanh || [])];
  }
  if (topicKey === "all" || topicKey === "tanSinhVien") {
    allPools = [...allPools, ...(questionsData.tanSinhVien || [])];
  }

  // Filter out invalid/malformed questions
  allPools = allPools.filter(
    (q) =>
      q &&
      q.id &&
      q.question &&
      String(q.question).trim() !== "" &&
      q.answer &&
      String(q.answer).trim() !== "" &&
      (!q.options || q.options.length > 0)
  );

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

  const selected = [
    ...diff1.slice(0, 2),
    ...diff2.slice(0, 2),
    ...diff3.slice(0, 2),
    ...diff4.slice(0, 1),
  ];

  let remaining = [
    ...diff1.slice(2),
    ...diff2.slice(2),
    ...diff3.slice(2),
    ...diff4.slice(1),
  ];
  shuffle(remaining);

  while (selected.length < count && remaining.length > 0) {
    selected.push(remaining.shift());
  }

  return selected.slice(0, count);
}
`;

fs.writeFileSync("questions.ts", tsContent);
console.log("done");
