import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LearningPage from "./pages/LearningPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SecuritySettingsPage from "./pages/settings/SecuritySettingsPage";
import AppearanceSettingsPage from "./pages/settings/AppearanceSettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import PrivacySettingsPage from "./pages/settings/PrivacySettingsPage";
import AuthPage from "./pages/AuthPage";
import { useTheme } from "./presentation/hooks/useTheme";

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={<AuthPage key="login" initialMode="login" />}
        />
        <Route
          path="/register"
          element={<AuthPage key="register" initialMode="register" />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<Navigate to="security" replace />} />
          <Route path="security" element={<SecuritySettingsPage />} />
          <Route path="appearance" element={<AppearanceSettingsPage />} />
          <Route path="notifications" element={<NotificationsSettingsPage />} />
          <Route path="privacy" element={<PrivacySettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
