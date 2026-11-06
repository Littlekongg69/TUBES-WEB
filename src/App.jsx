import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LearningPage from "./pages/LearningPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/learning" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
