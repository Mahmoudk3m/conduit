import { RouterProvider, createHashRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import { AppLayout } from "@/components/Layout";

const isAuth = true;

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: isAuth ? ProtectedRoutes : PublicRoutes
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
