import { Home } from "@/features/home";
import { Login, Register } from "@/features/auth";

const PublicRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
];

export default PublicRoutes;
