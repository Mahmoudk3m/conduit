import { RouterProvider, createHashRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import { AppLayout } from "@/components/Layout";
import CommonRoutes from "./CommonRoutes";

const isAuth = false;

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [...(isAuth ? ProtectedRoutes : PublicRoutes), ...CommonRoutes]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
