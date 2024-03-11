import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/queryClient";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
