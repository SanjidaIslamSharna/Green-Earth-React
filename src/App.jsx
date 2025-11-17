import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/layouts/Navbar";
import Footer from "./component/layouts/Footer";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import ScrollToTop from "./component/ScrollToTop";
import Invoice from "./component/Invoice";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
