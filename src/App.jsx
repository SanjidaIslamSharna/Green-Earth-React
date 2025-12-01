import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import ScrollToTop from "./component/ScrollToTop";
import Invoice from "./component/Invoice";
import Checkout from "./component/Checkout";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={ <> <Home />
            </>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
