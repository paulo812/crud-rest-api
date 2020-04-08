const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql").pool;

//Buscar todas as ferramentas
router.get("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM tools;", (error, result, field) => {
      if (error) {
        return response.status(500).send({ error: error });
      }
      return response.status(200).send({ response: result });
    });
  });
});

//inserir ferramenta
router.post("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO tools (name, owner, price) VALUES (?, ?, ?)",
      [request.body.name, request.body.owner, request.body.price],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        response.status(201).send({
          msg: "Ferramenta inserida!",
          id_tool: result.insertId,
        });
      }
    );
  });
});
//Buscara Ferramenta específica
router.get("/:id_tool", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM tools WHERE id_tools = ?;",
      [request.params.id_tool],
      (error, result, field) => {
        if (error) {
          return response.status(500).send({ error: error });
        }
        return response.status(200).send({ response: result });
      }
    );
  });
});

//Alterar ferramenta
router.patch("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "UPDATE tools SET name = ?, owner = ?, price = ? WHERE id_tools = ?",
      [
        request.body.name,
        request.body.owner,
        request.body.price,
        request.body.id_tools,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        response.status(202).send({
          msg: "Ferramenta alterada!",
        });
      }
    );
  });
});

//Deletar Ferramenta
router.delete("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM tools WHERE id_tools = ?",
      [request.body.id_tools],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        response.status(202).send({
          msg: "Ferramenta removida!",
        });
      }
    );
  });
});

module.exports = router;
