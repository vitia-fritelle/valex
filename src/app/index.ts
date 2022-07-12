import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import router from '../routers';
import middlewares from '../middlewares';

const app = express();
app.set('case sensitive routing', false);
app.set('strict routing', false);
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true}));
app.use(cors());
app.use(compression());
app.use(router);
app.use(middlewares.errorMiddlewares.errorHandler);
export default app;

