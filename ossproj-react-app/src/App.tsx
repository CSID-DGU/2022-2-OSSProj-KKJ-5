import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/siginup";
import { SignIn } from "./pages/signin";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
