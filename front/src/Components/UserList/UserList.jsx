import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // ID utilisateur sélectionné
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Aucun token trouvé. Veuillez vous connecter.');
          return;
        }

        const response = await fetch('http://localhost:3002/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.error || 'Erreur lors de la récupération des utilisateurs.');
          return;
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setMessage('');
      } catch (error) {
        console.error('Erreur :', error);
        setMessage('Impossible de contacter le serveur.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || 'Erreur lors de la suppression.');
        return;
      }

      setUsers(users.filter((user) => user._id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
      setMessage('Utilisateur supprimé avec succès.');
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de supprimer l\'utilisateur.');
    }
  };

  const handleEdit = (id) => {
    setSelectedUserId(id); // Définit l'utilisateur sélectionné
    setShowModal(true); // Affiche le modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Masque le modal
    setSelectedUserId(null); // Réinitialise l'utilisateur sélectionné
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center p-12 w-full rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-black">Liste des utilisateurs</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Rechercher par nom, email ou rôle..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 px-4 py-2 w-full bg-gray-200 border border-gray-400 text-black rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
      />
      <table className="w-full max-w-8xl table-auto border-collapse rounded-md">
        <thead>
          <tr className="bg-black rounded-md">
            <th className="px-4 py-2 border border-gray-700 text-left">Nom d'utilisateur</th>
            <th className="px-4 py-2 border border-gray-700 text-left">Email</th>
            <th className="px-4 py-2 border border-gray-700 text-left">Rôle</th>
            <th className="px-4 py-2 border border-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="rounded-md">
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-200">
              <td className="px-4 py-2 border border-gray-700 text-black">{user.username}</td>
              <td className="px-4 py-2 border border-gray-700 text-black">{user.email}</td>
              <td className="px-4 py-2 border border-gray-700 text-black">{user.role}</td>
              <td className="px-4 py-2 border border-gray-700 text-center text-black">
                <button
                  onClick={() => handleEdit(user._id)}
                  className="px-3 py-1 mr-2 bg-green-500 rounded text-white font-bold hover:bg-green-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 rounded text-white font-bold hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
            <EditUser id={selectedUserId} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

const EditUser = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3002/user/${id}`, {
            method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.error || 'Erreur lors de la récupération des informations de l\'utilisateur.');
          return;
        }

        const user = await response.json();
        setFormData({
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        console.error('Erreur :', error);
        setMessage('Impossible de charger les informations de l\'utilisateur.');
      }
    };

    fetchUser();
  }, [id]);

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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || 'Erreur lors de la mise à jour.');
        return;
      }

      setMessage('Utilisateur mis à jour avec succès.');
      onClose(); // Ferme le modal
      
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de mettre à jour.');
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-400 rounded text-black focus:outline-none focus:ring-1 focus:ring-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-400 rounded text-black focus:outline-none focus:ring-1 focus:ring-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rôle :</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-400 rounded text-black focus:outline-none focus:ring-1 focus:ring-gray-700"
            required
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 rounded text-white font-bold hover:bg-green-600 mr-2"
          >
            Mettre à jour
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 rounded text-white font-bold hover:bg-red-600"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserList;
