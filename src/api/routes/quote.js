import { Router } from "express";
import { Container } from 'typedi';
import { celebrate, Joi } from "celebrate";
import FtxService from '../../services/ftx';

const route = Router();

export default (app) => {
  app.use('/quote', route);

  route.post(
    "/",
    celebrate({
      body: Joi.object({
        action: Joi.string().required().valid('buy', 'sell'),
        base_currency: Joi.string().required().uppercase(),
        quote_currency: Joi.string().required().uppercase(),
        amount: Joi.string().required().regex(/^\d*\.?\d*$/),
      }),
    }),
    async (req, res, next) => {
      const logger = Container.get('logger');
      try {
        const ftxServiceInstance = Container.get(FtxService);
        const quoteResponse = await ftxServiceInstance.quote(req.body);
        return res.json(quoteResponse).status(200);
      } catch (e) {
        logger.error('error: %o', e);
        return next(e);
      }
    }
  );
}
