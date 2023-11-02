require("dotenv").config();
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

const ProductServices = require("../services/ProductServices.js");

class ProductController {
  async createProduct(req, res) {
    let data = req.body;
    let productInfo = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
      category: data.category,
    };
    try {
      //   Check if product already exists
      const existingProduct = await ProductServices.get(productInfo);
      if (existingProduct) {
        return res.status(409).json({
          error: true,
          message: "Product already exists.",
        });
      }

      const product = await ProductServices.create(productInfo);

      if (product) {
        return res.status(200).json({
          error: false,
          message: "Product Listed",
        });
      } else {
        return res
          .status(400)
          .json({ error: true, message: "Listing Failure." });
      }
    } catch (error) {
      console.log("Listing Error", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await ProductServices.getAll();
      if (products) {
        return res.status(200).json({ results: products });
      } else {
        return res
          .status(500)
          .json({ error: true, message: "Internal Server Error" });
      }
    } catch (error) {
      console.log("Listing Error", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async getByProductId(req, res) {
    try {
      let productId = req.params.productId;
      let existingProduct = await ProductServices.get({ id: productId });
      if (!existingProduct) {
        return res
          .status(404)
          .json({ error: true, message: "Product Not Found!" });
      }

      return res.status(200).json({ error: false, result: existingProduct });
    } catch (error) {
      console.log("Product not found!", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async updateProduct(req, res) {
    let productId = req.params.productId;
    let { product, user } = req.body;
    try {
      let existingProduct = await ProductServices.get({ id: productId });

      if (!existingProduct) {
        return res
          .status(200)
          .json({ error: true, message: "Update Failure!" });
      }

      existingProduct.name = product.name;
      existingProduct.quantity = product.quantity;
      existingProduct.price = product.price;
      existingProduct.category = product.category;
      existingProduct.description = product.description;
      existingProduct.image = product.image;

      existingProduct.save();

      if (existingProduct.quantity < 10) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_APP_PASSWORD,
          },
        });

        const htmlBody = `
    <h2 style="color: #333;">Product Stock Notification</h2>
    <p>Dear Admin,</p>
    <p>This is to inform you that the following product is running low in stock or has gone out of stock:</p>
    <p>
      <strong>Product Name:</strong> ${product.name}<br>
      <strong>Product ID:</strong> ${product.id}<br>
      <strong>Current Stock:</strong> ${product.quantity}
    </p>
    <p>Please take appropriate action to manage the stock levels.</p>
    <p>Thank you,<br>Ayush Ranjan Sinha</p>
  `;
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: "Product getting out of stock",
          html: htmlBody,
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent:", info.response);
        } catch (error) {
          console.error("Error:", error.message);
        }
      }

      return res
        .status(200)
        .json({ error: false, message: "Product Updated!" });
    } catch (error) {
      console.log("Update Error", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async deleteProduct(req, res) {
    let productId = req.params.productId;
    try {
      const response = await ProductServices.delete({
        id: productId,
      });

      if (response) {
        return res.status(200).json({
          error: false,
          message: "Product Deleted",
        });
      }
      return res.status(400).json({ error: true, message: "Delete Failure." });
    } catch (error) {
      console.log("Delete Error", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async searchProducts(req, res) {
    try {
      const { filters } = req.body;
      const whereClause = {};

      if (filters.name) {
        whereClause.name = {
          [Op.like]: `%${filters.name}%`,
        };
      }

      if (filters.category) {
        whereClause.category = filters.category;
      }

      if (filters.minPrice && filters.maxPrice) {
        whereClause.price = {
          [Op.between]: [filters.minPrice, filters.maxPrice],
        };
      }

      const products = await ProductServices.getMany(whereClause);

      return res.status(200).json(products);
    } catch (error) {
      console.error("Search failed:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = new ProductController();
