require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

const userRoutes = require("./src/routes/UserRoutes.js");
const productRoutes = require("./src/routes/ProductRoutes.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Welcome to my API</h1>");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
