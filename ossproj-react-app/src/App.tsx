import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Home } from "./pages/home";
import { Chat } from "./pages/chat";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./context/user-context";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const queryClient = new QueryClient();

function App() {
  return (
<<<<<<< HEAD
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </QueryClientProvider>
    </UserProvider>
=======
    <div className={"App"}>
      <StylesProvider injectFirst>
        <DndProvider backend={HTML5Backend}>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </QueryClientProvider>
          </UserProvider>
        </DndProvider>
      </StylesProvider>
    </div>
>>>>>>> c0377a0c763054ad6483c5879238ff2564dac869
  );
}

export default App;
