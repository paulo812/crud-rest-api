const express = require("express");
const routeTools = require("./routes/Tools");
const routeRentals = require("./routes/Rentals");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false})); //apenas dados simples
app.use(bodyParser.json());//json de entrada no body

app.use("/tools", routeTools);
app.use("/rentals", routeRentals);

//Tratamento de erros
app.use((request, response, next) => {
  const error = new Error("Página não encontrada.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);

  return response.send({
    error: {
      msg: error.message,
    },
  });
});

module.exports = app;