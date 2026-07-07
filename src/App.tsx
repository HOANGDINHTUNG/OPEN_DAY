import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "./components/layout/ShaderBackground";
import { HomePage } from "./features/home/HomePage";
import { LevelSelectionPage } from "./features/gameplay/LevelSelectionPage";
import { GamePlayPage } from "./features/gameplay/GamePlayPage";
import { PrizeManagementPage } from "./features/admin/PrizeManagementPage";
import { LeaderboardPage } from "./features/leaderboard/LeaderboardPage";
import { TechPage } from "./features/info/TechPage";
import { SoftSkillsPage } from "./features/info/SoftSkillsPage";
import { DigitalPage } from "./features/info/DigitalPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/level" element={<LevelSelectionPage />} />
          <Route path="/play/:levelId" element={<GamePlayPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/soft-skills" element={<SoftSkillsPage />} />
          <Route path="/digital" element={<DigitalPage />} />

          <Route path="/admin" element={<PrizeManagementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
