const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

dotenv.config();

// Récupération de tous les utilisateurs
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "username");
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupération d'un produit par son id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("owner", "username");
    if (!product) {
      return res.status(400).send({ error: "Produit non trouvé" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupérer les produits d'un utilisateur
const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.params.id });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupérer les produits d'une catégorie
const getCategoryProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const products = await Product.find({ name: new RegExp(req.params.search, 'i') });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Création d'un produit
const newProduct = async (req, res) => {
  try {
    // définir le nom de l'owner avec son token
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le token
    req.body.owner = decoded.id; // Ajouter l'id de l'owner au body
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Mise à jour d'un produit
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(400).send({ error: "Produit non trouvé" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Suppression d'un produit
const deleteProduit = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).send({ error: "Produit non trouvé" });
    }
    res.status(200).send("Produit supprimé");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getAllProducts, getProductById, getUserProducts, getCategoryProducts, getSearchProduct, newProduct, updateProduct, deleteProduit };
