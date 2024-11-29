import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
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
    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setFormData({ username: '', email: '', password: '', role: 'user' });
      } else {
        setMessage(data.error || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de contacter le serveur.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h2 className="text-3xl font-bold mb-6">Inscription</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-2"
          >
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-700 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
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
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2"
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
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Rôle :
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-700 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 rounded text-white font-bold hover:bg-gray-500"
        >
          S'inscrire
        </button>
      </form>
      <button
        onClick={handleLoginRedirect}
        className="mt-4 underline text-gray-500 hover:text-black"
      >
        Aller à la page de connexion
      </button>
    </div>
  );
};

export default Register;
