import { Article } from "@/features/article";
import { Editor } from "@/features/edit-article";
import { Home } from "@/features/home";
import { Profile } from "@/features/profile";
import { Settings } from "@/features/settings";

const ProtectedRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/editor/:slug",
    element: <Editor />
  },
  {
    path: "/article/:slug",
    element: <Article />
  },
  {
    path: "/profile/:slug",
    element: <Profile />
  }
];

export default ProtectedRoutes;
