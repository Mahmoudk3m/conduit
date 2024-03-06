import { Article } from "@/features/article";
import { Home } from "@/features/home";
import { Profile } from "@/features/profile";

const CommonRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/profile/:username",
    element: <Profile />
  },
  {
    path: "/article/:slug",
    element: <Article />
  }
];

export default CommonRoutes;
