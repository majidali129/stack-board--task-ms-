import { Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "./features/auth/components/auth-layout";
import {
  analyticsPath,
  dashboardPath,
  profilePath,
  projectsPath,
  settingsPath,
  signInPath,
  signUpPath,
  tasksPath,
} from "./paths";
import { SignUpPage } from "./pages/sign-up";
import { SignInPage } from "./pages/sign-in";
import { ProtectedRoute } from "./components/protected-route";
import { DashboardPage } from "./pages/dashboard";
import { AppLayout } from "./components/app-layout";
import { TasksPage } from "./pages/tasks";
import { AnalyticsPage } from "./pages/analytics";
import { ProfilePage } from "./pages/profile";
import { SettingsPage } from "./pages/settings";
import { ProjectsPage } from "./pages/projects";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to={dashboardPath()} />} />
        <Route path={dashboardPath()} element={<DashboardPage />} />
        <Route path={tasksPath()} element={<TasksPage />} />
        <Route path={analyticsPath()} element={<AnalyticsPage />} />
        <Route path={projectsPath()} element={<ProjectsPage />} />
        <Route path={profilePath()} element={<ProfilePage />} />
        <Route path={settingsPath()} element={<SettingsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={signUpPath()} element={<SignUpPage />} />
        <Route path={signInPath()} element={<SignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;
