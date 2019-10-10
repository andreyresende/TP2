import { Router } from 'express';
import cors from 'cors'
import QueryController from './app/controllers/QueryController'
import KwicController from "./app/controllers/KwicController";
const routes = new Router();

routes.use(cors())

routes.post('/', QueryController.query)
routes.get('/titles', QueryController.show)
routes.get('/kwic', KwicController.shifting)
//routes.get('/verify', KwicController.KwicRun)


export default routes;
