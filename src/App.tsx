import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/queryClient";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
