import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Connexion réussie !');
        localStorage.setItem('token', data.token); // Stocke le token JWT
        setFormData({ email: '', password: '' }); // Réinitialise le formulaire
        navigate('/Home'); // Redirige vers la liste des utilisateurs ou une autre page
      } else {
        setMessage(data.error || 'Erreur de connexion.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de contacter le serveur.');
    }
  };
  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige vers la page d'inscription
  };

  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
          <h2 className="text-3xl font-bold mb-6">Connexion</h2>
          {message && <p className="mb-4 text-center text-red-500">{message}</p>}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-black p-8 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-700 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Mot de passe :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-700 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 rounded text-white font-bold hover:bg-green-600"
            >
              Se connecter
            </button>
          </form>
          <button
            onClick={handleRegisterRedirect}
            className="mt-4 underline text-gray-500 hover:text-black"
          >
            Je n'ai pas de compte, m'inscrire
          </button>
        </div>
      );
    };
    

export default Login;
