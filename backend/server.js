import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // 🔹 Permet de traiter JSON
app.use(express.urlencoded({ extended: true })); // 🔹 Permet de traiter URL-encoded
// Routes
app.use("/api/auth", userRoutes);
// ✅ Vérifie que les variables d'environnement existent
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mindcare";  // 🔹 Utilisation de `127.0.0.1` au lieu de `localhost`

// ✅ Connexion MongoDB améliorée
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté avec succès");
    app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB Error :", error.message));

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "MindCare AI Backend is running 🚀" });
});
