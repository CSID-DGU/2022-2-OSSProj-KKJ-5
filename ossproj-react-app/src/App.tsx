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
          <Route path="/chat/room/enter/c5be0dd9-b1ec-4618-b601-413dae16c931" element={<Chat />} />
=======
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/room/enter/1" element={<Chat />} />
>>>>>>> e641f068c27045924d89050196471fcf6ea9bad9
        </Routes>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
