import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import ProfilePage from "../pages/profilePage";
import LoginPage from "../pages/loginPage";

const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

export default router;
