import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
app.post("/", async (request, response) => {
  const { name, price, imageUrl } = request.body

  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      imageUrl: imageUrl
    }
  })

  return response.status(201).json(product, {message: "Produto cadastrado com sucesso!"})
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado com sucesso na porta ${PORT}`);
});
