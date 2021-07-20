const express = require("express");
const routesFF = require("./routes/routes.js");
const app = express();
port = 3000;

app.use(express.json());

app.use("/", routesFF);

app.listen(port, () => {
  console.info(`App rodando em: http://localhost:${port}`);
});
