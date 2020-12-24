import { Router } from "express";

import AnswerQuestionController from "./app/controllers/AnswerQuestionController";
import QuestionController from "./app/controllers/QuestionController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import DashboardController from "./app/controllers/DashboardController";


import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// PUBLIC ROUTES

routes.post("/login", SessionController.store);

//Para usar a rota privada ativar o middleware de autenticação e enviar o jwt
//routes.use(authMiddleware);

// PRIVATE ROUTES
routes.post("/answer", AnswerQuestionController.store);
routes.post("/question", QuestionController.store);
routes.post("/user", UserController.store);

routes.get("/answer", AnswerQuestionController.index);
routes.get("/answer/:id", AnswerQuestionController.indexById);
routes.get("/answer/result/:id", AnswerQuestionController.indexByIdResult);
routes.get("/question", QuestionController.index);
routes.get("/question/:id", QuestionController.indexById);
routes.get("/user", UserController.index);
routes.get("/dashboard", DashboardController.index);

routes.put('/question/:id',QuestionController.update);
routes.put('/user/:id',UserController.update);

routes.delete('/question/:id',QuestionController.delete);
routes.delete('/user/:id',UserController.delete);

export default routes;
