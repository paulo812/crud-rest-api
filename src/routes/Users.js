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

router.get("/", (require, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM users;", (error, result, field) => {
      if (error) {
        return response.status(500).send({ error: error });
      }
      return response.status(200).send({ response: result });
    });
  });
});

router.patch("/", (require, response, next) => {
  response.status(201).send({
    msg: "Atualiza algum user",
  });
});

router.delete("/", (require, response, next) => {
  response.status(200).send({
    msg: "Deleta um pedido de aluguel",
  });
});

module.exports = router;
