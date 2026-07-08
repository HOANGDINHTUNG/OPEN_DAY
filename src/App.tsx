import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "./components/layout/ShaderBackground";
import { HomePage } from "./features/home/HomePage";
import { RulesPage } from "./features/home/RulesPage";
import { GamePlayPage } from "./features/gameplay/GamePlayPage";
import { ResultPage } from "./features/gameplay/ResultPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/play" element={<GamePlayPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
