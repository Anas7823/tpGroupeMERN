import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
// import Home from './Components/Home/Home'
// import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Produits from './Components/Produits/Produits';
import DetailsProduit from './Components/DetailsProduit/DetailsProduit';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/produit/:id" element={<DetailsProduit />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
