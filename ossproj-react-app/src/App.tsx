import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Home } from "./pages/home";
import { Chat } from "./pages/chat";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./context/user-context";
import { createGlobalStyle } from "styled-components";

const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD

          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/room/enter/1" element={<Chat />} />

=======
          <Route path="/chat" element={<Chat />} />
>>>>>>> d676399943e7b0447193b4d60d09a1bb59c00107
        </Routes>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
