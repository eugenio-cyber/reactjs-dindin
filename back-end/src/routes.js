const express = require("express");
const users = require("./controllers/users");
const transactions = require("./controllers/transactions");
const login = require("./controllers/login");
const category = require("./controllers/category");
const verifyLogin = require("./filters/verifyLogin");
const routes = express();

routes.post("/user", users.registerUser);
routes.post("/login", login.login);
routes.use(verifyLogin);
routes.get("/user", users.detailUser);
routes.put("/user", users.updateUser);
routes.get("/category", category.listCategories);
routes.get("/transaction", transactions.readTransactions);
routes.get("/transaction/summary", transactions.transactionsSummary);
routes.get("/transaction/:id", transactions.findTransaction);
routes.post("/transaction", transactions.createTransaction);
routes.put("/transaction/:id", transactions.updateTransaction);
routes.delete("/transaction/:id", transactions.deleteTransaction);

module.exports = routes;
