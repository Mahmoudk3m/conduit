import { RouterProvider, createHashRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import { AppLayout } from "@/Shared/Layout";
import CommonRoutes from "./CommonRoutes";
import useUserStore from "@/stores/userStore";

export default function AppRouter() {
  const { user } = useUserStore();

  const router = createHashRouter([
    {
      element: <AppLayout />,
      children: [...(user ? ProtectedRoutes : PublicRoutes), ...CommonRoutes]
    }
  ]);

  return <RouterProvider router={router} />;
}
