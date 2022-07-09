import { Router } from "express";
import persons from "./persons/index.js"
import events from "./events/index.js"
import login from "./login/index.js"

const routes = Router();

routes.use("/persons", persons)
routes.use("/events", events)
routes.use("/login", login)

export default routes;
