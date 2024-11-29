import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MesProduits.css';
import { Link } from 'react-router-dom';

function MesProduits() {
    const [myUser, setMyUser] = useState(null);
    const [MesProduits, setMesProduits] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // Pour savoir quel produit on modifie
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    // Récupérer l'utilisateur
    useEffect(() => {
        axios.get('http://localhost:3002/user/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setMyUser(res.data);
        })
        .catch(err => console.error("Erreur lors de la récupération de l'utilisateur", err));
    }, []);

    // Récupérer les produits
    useEffect(() => {
        if (myUser && myUser._id) {
            axios.get(`http://localhost:3002/product/user/${myUser._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setMesProduits(res.data);
            })
            .catch(err => console.error("Erreur lors de la récupération des produits", err));
        }
    }, [myUser]);

    // Fonction pour supprimer un produit
    const deleteProduit = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMesProduits(MesProduits.filter(produit => produit._id !== id));
            console.log('Produit supprimé:', response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression du produit', error);
        }
    };

    // Fonction pour activer le mode édition
    const startEditing = (produit) => {
        setEditingProduct(produit); // Active le mode édition
        setFormData({
            name: produit.name,
            description: produit.description,
            price: produit.price,
        });
    };

    // Fonction pour gérer la modification du produit
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour soumettre la mise à jour du produit
    const updateProduit = async (id) => {
        try {
            const updatedProductData = { ...formData };
            const response = await axios.put(`http://localhost:3002/product/${id}`, updatedProductData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMesProduits(MesProduits.map(produit => 
                produit._id === id ? response.data : produit
            ));
            setEditingProduct(null); // Désactive le mode édition
            console.log('Produit mis à jour:', response.data);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit', error);
        }
    };

    return (
        <div className="Produit">
            {MesProduits.length > 0 ? (
                MesProduits.map(produit => (
                    <div className="card" key={produit._id}>
                        <div className="img_card">
                            <img src={produit.image} alt={produit.name} />
                        </div>
                        <div className="infos_card">
                            {editingProduct && editingProduct._id === produit._id ? (
                                <div>
                                    {/* Formulaire d'édition */}
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={() => updateProduit(produit._id)}>
                                        Sauvegarder
                                    </button>
                                    <button onClick={() => setEditingProduct(null)}>
                                        Annuler
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="title_product">
                                        {produit.name}
                                    </div>
                                    <div className="description_product">
                                        {produit.description}
                                    </div>
                                    <div className="prix_product">
                                        {produit.price} €
                                    </div>
                                    <Link to={`/produit/${produit._id}`}>
                                        Voir le produit
                                    </Link>
                                    {/* Bouton pour éditer */}
                                    <button onClick={() => startEditing(produit)}>
                                        Modifier
                                    </button>
                                    {/* Bouton pour supprimer */}
                                    <button onClick={() => deleteProduit(produit._id)}>
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>Vous n'avez aucun produit.</p>
            )}
        </div>
    );
}

export default MesProduits;
