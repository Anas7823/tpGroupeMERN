import React, { useState } from 'react';
import axios from 'axios';
import './AjouterProduit.css';

function AjouterProduit() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '', // Vous pouvez ajouter un champ pour l'image si nécessaire
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Gestion des changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour soumettre le formulaire et créer un produit
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/product/new', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccessMessage('Produit ajouté avec succès !');
            setErrorMessage('');
            setFormData({ name: '', description: '', price: '', image: '' }); // Réinitialiser le formulaire
        } catch (error) {
            setErrorMessage('Erreur lors de l\'ajout du produit');
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <h2>Ajouter un produit</h2>

            {/* Affichage des messages de succès ou d'erreur */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom du produit</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AjouterProduit;
