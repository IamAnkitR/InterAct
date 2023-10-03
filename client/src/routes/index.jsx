import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import ProfilePage from "../pages/profilePage";
import LoginPage from "../pages/loginPage";

const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/profile/:userId",
      element: <ProfilePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
  ]);

export default router;
