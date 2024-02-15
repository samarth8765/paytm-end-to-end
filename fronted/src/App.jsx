import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Sigin />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
