const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

// Récupération de tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    // recuperer l'id depuis le token
    const id = req.headers.authorization.split(" ")[1];
    console.log(id);
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Inscription
const registerUser = async (req, res) => {
  try {
    console.log("req.body : " + req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Connexion
const loginUser = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {id: user._id, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(200).send({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Mise à jour d'un utilisateur
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    res.status(200).send("Utilisateur supprimé");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerUser, getUserById, loginUser, getAllUsers, updateUser, deleteUser };