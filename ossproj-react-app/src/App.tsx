import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Home } from "./pages/home";
import { Chat } from "./pages/chat";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
