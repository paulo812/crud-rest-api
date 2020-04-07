const express = require("express");
const router = express.Router();

router.get("/", (require, response, next) => {
  response.status(200).send({
    msg: "GET para a Lista  de tools",
  });
});

router.post("/", (require, response, next) => {
  response.status(201).send({
    msg: "POST para a rota de tools",
  });
});

router.get("/:id_tool", (require, response, next) => {
  const id = require.params.id_tool;

  response.status(200).send({
    msg: "GET para uma tool específica",
    id: id,
  });
});

router.patch("/", (require, response, next) => {
  esponse.status(201).send({
    msg: "PATCH para a rota de tools",
  });
});

router.delete("/", (require, response, next) => {
  esponse.status(201).send({
    msg: "DELETE para a rota de tools",
  });
});

module.exports = router;
