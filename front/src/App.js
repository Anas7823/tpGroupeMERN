import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
// import Home from './Components/Home/Home'
// import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Produits from './Components/Produits/Produits';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/produits" element={<Produits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
