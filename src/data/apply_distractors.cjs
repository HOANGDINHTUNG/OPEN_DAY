const fs = require("fs");
const d1 = require("./distractors1.json");
const d2 = require("./distractors2.json");
const d3 = require("./distractors3.json");
const d4 = require("./distractors4.json");

const allDistractors = { ...d1, ...d2, ...d3, ...d4 };

let questionsStr = fs.readFileSync("questions.ts", "utf8");

// The file exports questionsData. We can extract the JSON part.
const startIdx = questionsStr.indexOf("{");
const funcIdx = questionsStr.indexOf("export function getRandomizedGameSet");

const jsonStr = questionsStr.substring(
  questionsStr.indexOf(
    "{",
    questionsStr.indexOf("export const questionsData = "),
  ),
  questionsStr.lastIndexOf(";", funcIdx),
);
let qd = JSON.parse(jsonStr);

for (const topic of ["nangLucSo", "doVuiTrend", "traLoiNgan"]) {
  if (!qd[topic]) continue;
  for (const q of qd[topic]) {
    if (allDistractors[q.id]) {
      const replacement = allDistractors[q.id];
      q.options = [replacement.A, replacement.B, replacement.C, replacement.D];
    }
  }
}

// Regenerate TS
let tsContent =
  "export const questionsData = " + JSON.stringify(qd, null, 2) + ";\n\n";
tsContent += questionsStr.substring(funcIdx);

fs.writeFileSync("questions.ts", tsContent);
console.log("Distractors applied successfully!");
