import Home from "./assets/Home/Home";
import About_page from "./assets/About/About_page";
import Contact_us from "./assets/Contact/Contact_us";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About_page />} />
      <Route path="/Contact" element={<Contact_us />} />
    </Routes>
  );
}

export default App;
