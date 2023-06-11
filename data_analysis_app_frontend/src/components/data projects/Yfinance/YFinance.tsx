import React, { useEffect, useState } from "react";

const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws";
const symbols = ["btc", "eth", "bnb", "gal", "gmt", "xrp", "doge", "ltc"];
const params = symbols.map((val) => {
  return `${val}usdt@trade`;
});
const intialPricesState = symbols.map((val: string) => {
  var initial_price = { name: `${val.toUpperCase()}USDT`, price: 0 };
  return initial_price;
});

const request = {
  method: "SUBSCRIBE",
  params: params,
  id: 1,
};
const CryptoFinance = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [prices, setPrices] = useState(intialPricesState);

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
    };
    wsClient.onclose = () => console.log("ws closed");
    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      // here is where something should trigger if a message is recieved.
      ws.onmessage = (evt) => {
        console.log(evt.data);
        // parse the data get name and price
        const data = JSON.parse(evt.data);
        const coin_name = data.s;
        const new_price_idx = prices.findIndex(
          (price) => price.name === coin_name
        );
        console.log(new_price_idx);
        console.log(prices);
        if (new_price_idx === -1) {
          return;
        }
        var new_price = prices;
        new_price[new_price_idx].price = parseFloat(data.p);
        setPrices([...new_price]);
      };
    }
  }, [ws, prices]);
  console.log(prices);
  return (
    <div>
      {prices.map((coin, index) => {
        return (
          <div>{`${coin.name} PRICE: ${
            coin.price === 0 ? "Waiting for data" : coin.price
          }`}</div>
        );
      })}
    </div>
  );
};
export default CryptoFinance;
