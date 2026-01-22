import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
 
import About from "./pages/About"; 
import Home from "./pages/Home";
import Header from "./Components/Header";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import Products from "./pages/Products";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <Router>
      <div className="min-h-screen  flex flex-col">
        <Header />
        <main className=" ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element ={<Products/>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element = {<CartPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>

            
          </Routes>
          
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
