import { Login, Register } from "@/features/auth";

const PublicRoutes = [
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
