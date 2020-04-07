const express = require("express");
const router = express.Router();

router.get("/", (require, response, next) => {
  response.status(200).send({
    msg: "Lista os pedidos de aluguel",
  });
});

router.post("/", (require, response, next) => {
  response.status(201).send({
    msg: "Cria um pedido de aluguel",
  });
});

router.get("/:id_rent", (require, response, next) => {
  const id = require.params.id_rent;

  response.status(200).send({
    msg: "lista um pedido específico",
    id: id,
  });
});

router.patch("/", (require, response, next) => {
  response.status(201).send({
    msg: "Atualiza algum pedido de aluguel",
  });
});

router.delete("/", (require, response, next) => {
  response.status(200).send({
    msg: "Deleta um pedido de aluguel",
  });
});

module.exports = router;
