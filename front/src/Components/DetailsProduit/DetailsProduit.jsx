import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Minus, Plus, Share2 } from "lucide-react";
import axios from "axios";

// Création d'une instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json'
  }
});

const DetailsProduit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Vérification des données reçues
        console.log("Données du produit:", response.data);

        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération du produit:", err);
        setError(err.response?.data?.error || "Une erreur est survenue lors de la récupération du produit");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert(`${quantity} × ${product.name} ajouté(s) au panier`);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produit non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          className="flex items-center mb-8 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500">Aucune image disponible</p>
              </div>
            )}
            <button
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm mb-2">
                  {product.category}
                </span>
              )}
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-3xl font-bold mt-4">{product.price?.toFixed(2)} €</p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "Aucune description disponible"}
              </p>
              {product.owner && (
                <p className="text-sm text-gray-500 mt-2">
                  Vendu par : {product.owner.username || "Vendeur inconnu"}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Ajouté le : {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-semibold mb-4">Quantité</h2>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 border rounded-md hover:bg-gray-100"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  className="p-2 border rounded-md hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              className="w-full h-14 text-lg mt-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleAddToCart}
            >
              Ajouter au panier - {(product.price * quantity).toFixed(2)} €
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduit;