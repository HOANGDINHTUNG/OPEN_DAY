const fs = require("fs");
const path = require("path");
const { questionsData } = require("./questions.js");

// Create dummy questions.js if needed or we just recreate the questions Data.
// Actually, it's easier to just write a standalone script that contains the new hard questions
// and merges into the parsed data, then outputs a fresh questions.ts
