import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Produits from './Components/Produits/Produits';
import DetailsProduit from './Components/DetailsProduit/DetailsProduit';
import MesProduits from './Components/MesProduits/MesProduits';
import Home from './Components/Home/Home'
import UserList from './Components/UserList/UserList'
import AjouterProduit from './Components/AjouterProduit/AjouterProduit'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/produit/:id" element={<DetailsProduit />} />
        <Route path="/mesProduits" element={<MesProduits />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/UserList' element={<UserList/>} />
        <Route path='/AjouterProduit' element={<AjouterProduit/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
