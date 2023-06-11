import React, { useEffect, useState } from "react";

const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws";
const symbols = ["btc", "eth"];
const params = symbols.map((val) => {
  return `${val}usdt@trade`;
});
const request = {
  method: "SUBSCRIBE",
  params: params,
  id: 1,
};
const CryptoFinance = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [prices, setPrices] = useState({
    bitCoin: 0,
    etheruem: 0,
  });

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      console.log("I am open");
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
        if (data.s === "ETHUSDT") {
          setPrices({ ...prices, etheruem: data.p });
        }
        if (data.s === "BTCUSDT") {
          setPrices({ ...prices, bitCoin: data.p });
        }
      };
    }
  }, [ws, prices]);

  return (
    <div>
      {`Bitcoin price is ${prices.bitCoin}`} <br />
      {`Ethereum price is ${prices.etheruem}`}{" "}
    </div>
  );
};
export default CryptoFinance;
