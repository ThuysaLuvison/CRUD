import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
app.post("/", async (request, response) => {
  const { name, price, imageUrl } = request.body;

  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return response
    .status(201)
    .json(product, { message: "Produto cadastrado com sucesso!" });
});
app.get("/", async (request, response) => {
  const product = await prisma.product.findMany();
  return response
    .status(200)
    .json(product, { message: "Produto listado com sucesso!" });
});
app.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return response.status(404).json({ message: "Produto não encontrado!" });
    }

    return response
      .status(200)
      .json({ message: "Produto encontrado com sucesso!", product });
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao buscar o produto!",
      error: error.message,
    });
  }
});
app.put("/:id", async (request, response) => {
  const { name, price, imageUrl } = request.body;
  const product = await prisma.product.update({
    where: {
      id: request.params.id,
    },
    data: {
      name: name,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return response
    .status(200)
    .json(product, { message: "Produto atualizado com sucesso!" });
});

app.delete("/:id", async (request, response) => {
  const { name, price, imageUrl } = request.body;

  const product = await prisma.product.delete({
    where: {
      id: request.params.id,
    },
  });
  return response
    .status(200)
    .json(product, { message: "Produto excluido com sucesso!" });
});
app.listen(PORT, () => {
  console.log(`Servidor iniciado com sucesso na porta ${PORT}`);
});
