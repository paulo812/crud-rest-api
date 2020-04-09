const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql").pool;

router.get("/", (require, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM users;", (error, result, field) => {
      if (error) {
        return response.status(500).send({ error: error });
      }
      const res = {
        quantidade: result.length,
        ferramentas: result.map((user) => {
          return {
            id_users: user.id_users,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            req: {
              type: "GET",
              description: "Retorna todos os usuários",
              url: "http://localhost:3000/users/" + user.id_users,
            },
          };
        }),
      };
      return response.status(200).send({ res });
    });
  });
});

router.get("/:id_users", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM users WHERE id_users = ?;",
      [request.params.id_users],
      (error, result, fields) => {
        if (error) {
          return response.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return result
            .status(404)
            .send({ msg: "Useer não encontrado com este ID" });
        }
        const res = {
          tool: {
            id_users: result[0].id_users,
            name: result[0].name,
            phone: result[0].phone,
            email: result[0].email,
            address: result[0].address,
            req: {
              type: "GET",
              description: "Retorna um user por ID",
              url: "http://localhost:3000/users/" + request.body.id_users,
            },
          },
        };
        return response.status(200).send(res);
      }
    );
  });
});

router.post("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO users (name, phone, email, address) VALUES (?, ?, ?, ?)",
      [
        request.body.name,
        request.body.phone,
        request.body.email,
        request.body.address,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        const res = {
          mensagem: "Ferramenta iserida.",
          userCreated: {
            id_users: result.id_users,
            name: request.body.name,
            phone: request.body.phone,
            email: request.body.email,
            address: request.body.address,
            req: {
              type: "POST",
              description: "Cadastrar user",
              url: "http://localhost:3000/users/",
            },
          },
        };
        return response.status(201).send({ res });
      }
    );
  });
});

router.patch("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "UPDATE users SET name = ?, phone = ?, email = ?, address = ? WHERE id_users = ?",
      [
        request.body.name,
        request.body.phone,
        request.body.email,
        request.body.address,
        request.body.id_users,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        const res = {
          mensagem: "User atualizado",
          toolUpdated: {
            id_users: request.body.id_users,
            name: request.body.name,
            phone: request.body.phone,
            email: request.body.email,
            address: request.body.address,
            req: {
              type: "PATCH",
              description: "Atualizar Usuários",
              url: "http://localhost:3000/users/" + request.body.id_users,
            },
          },
        };
        return response.status(202).send({ res });
      }
    );
  });
});

router.delete("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM users WHERE id_users = ?",
      [request.body.id_users],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        const res = {
          message: "Usuário removido",
          req: {
            type: "DELETE",
            description: "Deleta um user",
            url: "http://localhost:3000/users/",
            body: {
              name: "String",
              phone: "String",
              email: "String",
              address: "String",
            },
          },
        };
        return response.status(202).send({ res });
      }
    );
  });
});

module.exports = router;
