import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import { SignUpProvider } from "./contexts/SignUpContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ProjectProvider } from "./contexts/ProjectsContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
const rootElement = document.getElementById("root");
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Teams from "./pages/Teams.jsx";
import Reports from "./pages/Reports.jsx";
import { TeamProvider } from "./contexts/TeamContext.jsx";
import { OwnerProvider } from "./contexts/OwnerContext.jsx";
import { TagProvider } from "./contexts/TagContext.jsx";
import { ReportProvider } from "./contexts/ReportContext.jsx";
import Settings from "./pages/Settings.jsx";
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/projects", element: <Projects /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/tasks/:taskId", element: <TaskDetails /> },
  { path: "/teams", element: <Teams /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
]);

root.render(
  <StrictMode>
    <SignUpProvider>
      <UserProvider>
        <LoginProvider>
          <TaskProvider>
            <ProjectProvider>
              <TeamProvider>
                <OwnerProvider>
                  <TagProvider>
                    <ReportProvider>
                      <RouterProvider router={router} />
                    </ReportProvider>
                  </TagProvider>
                </OwnerProvider>
              </TeamProvider>
            </ProjectProvider>
          </TaskProvider>
        </LoginProvider>
      </UserProvider>
    </SignUpProvider>
  </StrictMode>
);
