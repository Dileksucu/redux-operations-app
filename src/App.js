import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { UserDetails } from "./pages/UserDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/UserDetails/:id" element={<UserDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
