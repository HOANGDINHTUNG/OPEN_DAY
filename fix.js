const fs = require("fs");
let f = "src/features/leaderboard/LeaderboardPage.tsx";
let c = fs.readFileSync(f, "utf8");
c = c.replace(
  'ChevronLeft,\n} from "lucide-react";',
  'ChevronLeft,\n  Trophy,\n} from "lucide-react";',
);
fs.writeFileSync(f, c);
