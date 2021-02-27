import { Router } from 'express';
import quote from './routes/quote';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	quote(app);
	return app;
}