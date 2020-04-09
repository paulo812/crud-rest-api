const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql").pool;

router.get("/", (require, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      `SELECT rentals.id_rentals,
                       rentals.date,
                       users.id_users,
                       rentals.days,
                       users.name  
                  FROM rentals
            INNER JOIN users
                    ON users.id_users = rentals.rental_id_users;`,
      (error, result, field) => {
        if (error) {
          return response.status(500).send({ error: error });
        }
        const res = {
          alugueis: result.map((rent) => {
            return {
              id_rentals: rent.id_rentals,
              date: rent.date,
              days: rent.days,
              quantidade: result.length,
              user: {
                rental_id_users: rent.rental_id_users,
                name: rent.name,
              },
              req: {
                type: "GET",
                description: "Retorna todos os alugueis",
                url: "http://localhost:3000/rentals/" + rent.id_rentals,
              },
            };
          }),
        };
        return response.status(200).send({ res });
      }
    );
  });
});

router.post("/", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM users WHERE id_users = ?;"),
      [request.body.id_users],
      (error, result, field) => {
        if (result.length == 0) {
          return result
            .status(404)
            .send({ msg: "User não encontrado com este ID" });
        }
        conn.query(
          "INSERT INTO rentals (date, days, rental_id_users) VALUES (?, ?, ?)",
          [request.body.date, request.body.days, request.body.rental_id_users],
          (error, result, field) => {
            conn.release();
            if (error) {
              return response.status(500).send({ error: error });
            }
            const res = {
              mensagem: "Aluguel registrado.",
              rentCreated: {
                id_rentals: result.id_rentals,
                rental_id_users: request.body.rental_id_users,
                date: request.body.date,
                days: request.body.days,
                req: {
                  type: "POST",
                  description: "Cadastrar aluguel",
                  url: "http://localhost:3000/rentals/",
                },
              },
            };
            return response.status(201).send({ res });
          }
        );
      };
  });
});

router.get("/:id_rentals", (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM rentals WHERE id_rentals = ?;",
      [request.params.id_rentals],
      (error, result, fields) => {
        if (error) {
          return response.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return result
            .status(404)
            .send({ msg: "Aluguel não encontrado com este ID" });
        }
        const res = {
          rent: {
            id_rentals: result[0].id_rentals,
            rental_id_users: result[0].rental_id_users,
            date: result[0].date,
            days: result[0].days,
            req: {
              type: "GET",
              description: "Retorna um aluguel por ID",
              url: "http://localhost:3000/rentals/" + request.body.id_rentals,
            },
          },
        };
        return response.status(200).send(res);
      }
    );
  });
});

router.patch("/", (require, response, next) => {
  response.status(201).send({
    msg: "Atualiza algum pedido de aluguel",
  });
});

router.delete("/", (require, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM rentals WHERE id_rentals = ?",
      [request.body.id_rentals],
      (error, result, field) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        const res = {
          message: "Aluguel cancelado",
          req: {
            type: "DELETE",
            description: "cancela uma aluguel",
            url: "http://localhost:3000/rentals/",
            body: {
              rental_id_users: "Number",
              date: "Date",
              days: "Smallint",
            },
          },
        };
        return response.status(202).send({ res });
      }
    );
  });
});

module.exports = router;
