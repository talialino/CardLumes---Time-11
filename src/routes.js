const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userControllers');
const historicController = require('./controllers/historicControllers');
const codeController = require('./controllers/codeControllers');

routes.get('/show/:cpf', userController.show);
routes.put('/historic/add/:cpf', historicController.adding);
routes.get('/historic/show/:cpf', historicController.find);
routes.put('/code/add/:cpf', codeController.coding);

module.exports = routes;
