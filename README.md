# FTX Backend Challenge

Web service that provides quotes for digital currency trades using data from the FTX orderbook.

## Installation

For the first time, you need to run
```
npm install
```

Then, use the command below for copying .env file and fill the necessary information (FTX Api key and secret)
```
cp .env.example .env
```

Then start the server with
```
npm run start
```

## Routes

### /api/v1/quote

Example request
```curl
curl -X POST -H "Content-Type: application/json" -d '{"action": "sell", "base_currency": "BTC", "quote_currency": "USD", "amount": "1.00"}' http://localhost:5000/api/v1/quote 
```

Example response
```json
{
  "total":"47217.96110000",
  "price":"47217.96110000",
  "currency":"USD"
}
```

## Error handling

Example request with errors
```
curl -X POST -H "Content-Type: application/json" -d '{"action": "test", "base_currency": "BTC", "quote_currency": "USD", "amount": "1.00"}' http://localhost:5000/api/v1/quote
```

Example error response
```json
{
  "message":"\"action\" must be one of [buy, sell]"
}
```
