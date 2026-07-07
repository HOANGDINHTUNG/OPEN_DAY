
import re
import json

with open("src/data/raw_questions.txt", "r", encoding="utf-8") as f:
    text = f.read()

# there are three sections
# Section 1: "Câu 3" up to "Ð? VUI LIÊN TREND"
# Section 2: "Ð? VUI LIÊN TREND" up to "15 câu h?i tr? l?i ng?n"
# Section 3: "15 câu h?i tr? l?i ng?n" up to end

parts = re.split(r"Ð? VUI LIÊN TREND SAU KÌ THI THPT QG|15 câu h?i tr? l?i ng?n  b?n m?n hon ", text)

def parse_mcq(text):
    questions = []
    blocks = text.split("________________________________________")
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        # Find Question number and text
        lines = block.split("\n")
        q_num = ""
        q_text = []
        options = []
        answer = ""
        explanation = []
        
        mode = "q_text"
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            if line.startswith("Câu "):
                q_num = line
            elif re.match(r"^[A-Z]\.", line):
                options.append(line)
            elif line.startswith("Ðáp án:"):
                answer = line.split(":", 1)[1].strip()
                mode = "explanation"
            elif mode == "q_text":
                q_text.append(line)
            elif mode == "explanation":
                explanation.append(line)
        
        if q_num:
            questions.append({
                "id": q_num,
                "question": "\n".join(q_text),
                "options": options,
                "answer": answer,
                "explanation": "\n".join(explanation) if explanation else None
            })
    return questions

def parse_short(text):
    questions = []
    blocks = text.split("________________________________________")
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        lines = block.split("\n")
        q_num = ""
        q_text = []
        answer = ""
        explanation = []
        
        mode = "q_text"
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            if line.startswith("Câu "):
                q_num = line
                if "CÂU CH?T" in q_num:
                    q_num = "Câu 15"
            elif line.startswith("Ðáp án:"):
                answer = line.split(":", 1)[1].strip()
                mode = "explanation"
            elif line.startswith("Ðáp án g?i ý:"):
                answer = line.split(":", 1)[1].strip()
                mode = "explanation"
            elif mode == "q_text":
                q_text.append(line)
            elif mode == "explanation":
                explanation.append(line)
        
        if q_num:
            questions.append({
                "id": q_num,
                "question": "\n".join(q_text),
                "answer": answer,
                "explanation": "\n".join(explanation) if explanation else None
            })
    return questions


data = {
    "nangLucSo": parse_mcq(parts[0]),
    "doVuiTrend": parse_mcq(parts[1]),
    "traLoiNgan": parse_short(parts[2])
}

ts_content = f"export const questionsData = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
with open("src/data/questions.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

