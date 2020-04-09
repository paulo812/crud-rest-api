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
      const res = {
        quantidade: result.length,
        ferramentas: result.map((tool) => {
          return {
            id_tools: tool.id_tools,
            name: tool.name,
            owner: tool.owner,
            price: tool.price,
            req: {
              type: "GET",
              description: "Retorna todos os produtos",
              url: "http://localhost:3000/tools/" + tool.id_tools,
            },
          };
        }),
      };
      return response.status(200).send({ res });
    });
  });
});

router.get("/:id_tools", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM tools WHERE id_tools = ?;",
      [request.params.id_tools],
      (error, result, fields) => {
        if (error) {
          return response.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return result
            .status(404)
            .send({ msg: "Ferramenta não encontrada com este ID" });
        }
        const res = {
          tool: {
            id_tools: result[0].id_tools,
            name: result[0].name,
            owner: result[0].owner,
            price: result[0].price,
            req: {
              type: "GET",
              description: "Retorna um produto por ID",
              url: "http://localhost:3000/tools/" + request.body.id_tools,
            },
          },
        };
        return response.status(200).send(res);
      }
    );
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
        const res = {
          mensagem: "Ferramenta iserida.",
          toolCreated: {
            id_tools: result.id_tools,
            name: request.body.name,
            owner: request.body.owner,
            price: request.body.price,
            req: {
              type: "POST",
              description: "Cadastrar ferramenta",
              url: "http://localhost:3000/tools/",
            },
          },
        };
        return response.status(201).send({ res });
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
        const res = {
          mensagem: "Ferramenta atualizada.",
          toolUpdated: {
            id_tools: request.body.id_tools,
            name: request.body.name,
            owner: request.body.owner,
            price: request.body.price,
            req: {
              type: "POST",
              description: "Atualizar ferramenta",
              url: "http://localhost:3000/tools/" + request.body.id_tools,
            },
          },
        };
        return response.status(202).send({ res });
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
        const res = {
          message: "Ferramenta removida",
          req: {
            type: "DELETE",
            description: "Deleta uma ferramenta",
            url: "http://localhost:3000/tools",
            body: {
              name: "String",
              owner: "String",
              price: "Number",
            },
          },
        };
        return response.status(202).send({ res });
      }
    );
  });
});

module.exports = router;
