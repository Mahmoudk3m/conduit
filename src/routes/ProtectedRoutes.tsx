import { Editor } from "@/features/edit-article";
import { Settings } from "@/features/settings";

const ProtectedRoutes = [
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/editor/",
    element: <Editor />
  },

  {
    path: "/editor/:slug",
    element: <Editor />
  }
];

export default ProtectedRoutes;
