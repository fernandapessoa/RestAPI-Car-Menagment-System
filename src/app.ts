import express from 'express';
import { router } from './routes/app.routes';
import { errorHandler, notFoundRouteHandler } from './routes/global.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger/swagger.json';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.all('*', notFoundRouteHandler);
app.use(errorHandler);

export { app };
