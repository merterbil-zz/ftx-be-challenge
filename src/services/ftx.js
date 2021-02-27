import { Service, Container } from 'typedi';

@Service()
export default class FtxService {
  _ftx = Container.get('ftx');

  _getMarket = async (baseCurrency, quoteCurrency) => {
    const market = [baseCurrency, quoteCurrency];
    const markets = await this._ftx.request({
      method: 'GET',
      path: `/markets`,
    });
    return (
      markets?.result
        ?.filter((item) => item.type === 'spot' && (item.name === market.join('/') || item.name === market.reverse().join('/')))
        .map((item) => item.name).pop() || []
    );
  };

  _getOrderbook = async (market, action) => {
    const orderbook = await this._ftx.request({
      method: 'GET',
      path: `/markets/${market}/orderbook`,
    });
    return (action === 'buy' ? orderbook?.result?.bids : orderbook?.result?.asks) || [];
  };

  quote = async ({ action, base_currency, quote_currency, amount }) => {
    let parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      throw new Error('amount cannot parsed');
    }

    const market = await this._getMarket(base_currency, quote_currency);
    if (!market) {
      throw new Error('No market for requested currency pair');
    }

    const orderbook = await this._getOrderbook(market, action);
    if (!orderbook?.length) {
      throw new Error('No orderbook for requested currency pair');
    }

    const total = orderbook.reduce((current, [unitPrice, size]) => {
      if (parsedAmount === 0) return current;

      if (parsedAmount > size) {
        parsedAmount -= size;
        return current + size * unitPrice;
      }

      const paymentPrice = parsedAmount * unitPrice;
      parsedAmount = 0;
      return current + paymentPrice;
    }, 0) || 0;

    return {
      total: total.toFixed(8),
      price: (total / parseFloat(amount)).toFixed(8),
      currency: quote_currency,
    };
  };
}
