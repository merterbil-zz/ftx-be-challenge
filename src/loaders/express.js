import bodyParser from 'body-parser';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import routes from '../api';
import config from '../config';

export default ({ app }) => {
  // Health Check endpoints
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Page not found');
    err['status'] = 404;
    next(err);
  });

  /// error handler
  app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message;
    if (isCelebrateError(err)) {
      const { details } = err.details.get('body');
      statusCode = 400;
      message = details.map((item) => item.message).join(' , ');
    }
    
    res.json({ message }).status(statusCode).end();
  });
};
