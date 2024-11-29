
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getAllUsers, registerUser, loginUser, updateUser, deleteUser, getUserById, getMyUser} = require("../controllers/userController");
const {getAllProducts, getProductById, getUserProducts, getCategoryProducts,getSearchProduct, newProduct, updateProduct, deleteProduit} = require("../controllers/productController");

router.get("/users", getAllUsers);
router.get("/user/me", authMiddleware, getMyUser);
router.get("/user/:id", authMiddleware, getUserById);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/:id", authMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, deleteUser);

router.get("/products", authMiddleware, getAllProducts);
router.get("/product/:id",authMiddleware, getProductById);
router.get("/product/user/:id",authMiddleware, getUserProducts);
router.get("/product/category/:category",authMiddleware, getCategoryProducts);
router.get("/product/search/:search",authMiddleware, getSearchProduct);
router.post("/product/new",authMiddleware, newProduct);
router.put("/product/:id",authMiddleware, updateProduct);
router.delete("/product/:id",authMiddleware, deleteProduit);

module.exports = router;
