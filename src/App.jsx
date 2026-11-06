import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LearningPage from "./pages/LearningPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/leaderboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/learning" element={<LearningPage />} />

        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
