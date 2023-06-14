import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./CryptoFinance.module.css";

const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws";
// 8 coins for now.
const symbols = ["btc", "eth", "bnb", "gal", "gmt", "xrp", "doge", "ltc"];
const icons = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g fill="none" fill-rule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        fill="#FFF"
        fill-rule="nonzero"
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      />
    </g>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g fill="none" fill-rule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g fill="#FFF" fill-rule="nonzero">
        <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
        <path d="M16.498 4L9 16.22l7.498-3.35z" />
        <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
        <path d="M16.498 27.995v-6.028L9 17.616z" />
        <path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
        <path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
      </g>
    </g>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path
        fill="#FFF"
        d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
      />
    </g>
  </svg>,
  <svg
    width="40"
    height="40"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <circle cx="16" cy="16" r="16" fill="#434247" />
      <g fill="#FFF">
        <path d="M16 4a11.911 11.911 0 100 23.823c6.579 0 11.911-5.333 11.911-11.912C27.911 9.333 22.58 4 16 4m0 23.341c-6.318 0-11.44-5.122-11.44-11.44C4.56 9.585 9.683 4.463 16 4.463s11.44 5.122 11.44 11.44c0 6.317-5.122 11.439-11.44 11.439" />
        <path d="M17.308 17.082h3.02v4.456c0 .442-.453.678-.885.905-.423.226-1.112.177-2.273.177h-1.416c-2.174.049-2.784-.118-3.305-.345-.521-.236-.787-.57-.787-1.003v-4.19h-1.564v4.721c0 .256.128.551.325.817.226.305.197.393.688.639.443.226.886.403 1.682.502.62.078.512.059 1.614.078h2.616c1.967-.039 2.37.099 3.54-.491.955-.473 1.28-1.023 1.348-1.378v-6.422h-4.593v1.534m-4.082-9.089c-.797.05-1.456.296-1.967.492-.521.197-.63.433-.846.689-.2.232-.312.529-.315.836v5.233h1.574V10.51c0-.403.246-.727.728-.963.492-.246 1.21-.364 1.879-.364h3.068c1.17 0 1.8-.02 2.164.196.374.236.817.443.817.886v1.249h1.573V9.833c-.029-.217-.265-.836-1.377-1.358-1.003-.472-1.327-.501-2.901-.501" />
      </g>
    </g>
  </svg>,
  <svg
    width="40"
    height="40"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <circle fill="#DBB358" cx="16" cy="16" r="16" />
      <g fill="#FFF">
        <path d="M21.246 11.66a.555.555 0 01.015 1.11H11.31v6.46h9.382v-2.77H14.39a.555.555 0 01-.555-.54v-.015c0-.301.24-.547.54-.555h6.872c.302 0 .547.24.555.54v3.896c0 .302-.24.547-.54.555H10.754a.555.555 0 01-.555-.54v-7.585c0-.301.24-.547.54-.554h10.507z" />
        <path d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5zm0 1.11c5.462 0 9.89 4.428 9.89 9.89 0 5.462-4.428 9.89-9.89 9.89-5.462 0-9.89-4.428-9.89-9.89 0-5.462 4.428-9.89 9.89-9.89z" />
        <path d="M17.61 8.402c.302 0 .547.24.555.54v3.273c0 .302-.24.547-.54.555h-3.237a.555.555 0 01-.554-.54V8.957a.555.555 0 011.11-.015v2.718h2.111V8.957c0-.302.24-.547.54-.555h.015zm0 10.828c.302 0 .547.24.555.54v3.273a.555.555 0 01-1.11.015V20.34h-2.11v2.703a.555.555 0 01-.541.555h-.015a.555.555 0 01-.555-.54v-3.273c0-.302.24-.547.54-.555h3.236z" />
      </g>
    </g>
  </svg>,
  <svg
    width="40"
    height="40"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <circle cx="16" cy="16" r="16" fill="#23292F" />
      <path
        d="M23.07 8h2.89l-6.015 5.957a5.621 5.621 0 01-7.89 0L6.035 8H8.93l4.57 4.523a3.556 3.556 0 004.996 0L23.07 8zM8.895 24.563H6l6.055-5.993a5.621 5.621 0 017.89 0L26 24.562h-2.895L18.5 20a3.556 3.556 0 00-4.996 0l-4.61 4.563z"
        fill="#FFF"
      />
    </g>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g fill="none" fill-rule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#C3A634" />
      <path
        fill="#FFF"
        d="M13.248 14.61h4.314v2.286h-4.314v4.818h2.721c1.077 0 1.958-.145 2.644-.437.686-.291 1.224-.694 1.615-1.21a4.4 4.4 0 00.796-1.815 11.4 11.4 0 00.21-2.252 11.4 11.4 0 00-.21-2.252 4.396 4.396 0 00-.796-1.815c-.391-.516-.93-.919-1.615-1.21-.686-.292-1.567-.437-2.644-.437h-2.721v4.325zm-2.766 2.286H9v-2.285h1.482V8h6.549c1.21 0 2.257.21 3.142.627.885.419 1.607.99 2.168 1.715.56.724.977 1.572 1.25 2.543.273.971.409 2.01.409 3.115a11.47 11.47 0 01-.41 3.115c-.272.97-.689 1.819-1.25 2.543-.56.725-1.282 1.296-2.167 1.715-.885.418-1.933.627-3.142.627h-6.549v-7.104z"
      />
    </g>
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 32 32"
  >
    <g fill="none" fill-rule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#BFBBBB" />
      <path
        fill="#FFF"
        d="M10.427 19.214L9 19.768l.688-2.759 1.444-.58L13.213 8h5.129l-1.519 6.196 1.41-.571-.68 2.75-1.427.571-.848 3.483H23L22.127 24H9.252z"
      />
    </g>
  </svg>,
];
const names = [
  "Bitcoin",
  "Ethereum",
  "Binance",
  "Galxe",
  "Green Metaverse Token",
  "Ripple",
  "Dogecoin",
  "Litecoin",
];
const params = symbols.map((val) => {
  return `${val}usdt@trade`;
});

interface initial_priceInterFace {
  icon: JSX.Element;
  name: string;
  symbol: string;
  price: string | number;
  priceDiff: string | number;
  quantity: string | number;
  quantityDiff: string | number;
}
const intialPricesState = symbols.map((val: string, idx: number) => {
  var initial_price: initial_priceInterFace = {
    icon: icons[idx],
    name: names[idx],
    symbol: `${val.toUpperCase()}USDT`,
    price: "waiting..",
    priceDiff: "waiting..",
    quantity: "waiting..",
    quantityDiff: "waiting..",
  };
  return initial_price;
});

const request = {
  method: "SUBSCRIBE",
  params: params,
  id: 1,
};
const CryptoFinance = () => {
  /**
   * steps:
   *
   * First attach the data to ag-grid with icons for each coin.
   * Second attempt to explore the data and understand each bit
   * Lastly, explore more potential features.
   *
   * specs:
   * show how it can be paged, sorted, filtered, grouped easily
   *
   * List of features:
   * 1. Copy look of https://www.livecoinwatch.com/
   * 2. Add graph and plot the data, not changes. Look at the "weekly" section.
   *
   */
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
        // parse the data get name and price
        const data = JSON.parse(evt.data);
        const coin_symbol = data.s;
        const new_price_idx = prices.findIndex(
          (price) => price.symbol === coin_symbol
        );
        if (new_price_idx === -1) {
          return;
        }
        var new_price = prices;

        if (typeof new_price[new_price_idx].price === "number") {
          // find the percentage difference between new number and old.
          const old_value = new_price[new_price_idx].price as number;
          const new_value = parseFloat(data.p);
          const priceDiff = // @ts-ignore
            (((new_value - old_value) / old_value) * 100).toFixed(2);
          new_price[new_price_idx].priceDiff = priceDiff;
        }
        if (typeof new_price[new_price_idx].quantity === "number") {
          const old_value = new_price[new_price_idx].quantity as number;
          const new_value = parseFloat(data.q);
          const quantityDiff = // @ts-ignore
            (((new_value - old_value) / old_value) * 100).toFixed(2);
          new_price[new_price_idx].quantityDiff = quantityDiff;
        }
        new_price[new_price_idx].price = parseFloat(data.p);
        new_price[new_price_idx].quantity = parseFloat(data.q);

        setPrices([...new_price]);
      };
    }
  }, [ws, prices]);

  // grid setup

  const gridRef: any = useRef();

  const columnDefs: any = [
    {
      field: "icon",
      width: 80,
      cellRenderer: (props: any) => {
        return (
          <div style={{ height: "40px", width: "40px" }}>{props.data.icon}</div>
        );
      },
    },
    { field: "name" },
    { field: "symbol" },
    {
      field: "price",
      cellRenderer: (props: any) => {
        if (props.data.price === "waiting..") {
          return <div>Waiting...</div>;
        } else if (props.data.priceDiff === "waiting..") {
          return <div>{`$${props.data.price}`}</div>;
        } else {
          return (
            <div>
              {`$${props.data.price}`}{" "}
              <span
                style={{ color: props.data.priceDiff > 0 ? "green" : "red" }}
              >{`${props.data.priceDiff > 0 ? "+" : "-"}${
                props.data.priceDiff
              }%`}</span>
            </div>
          );
        }
      },
    },

    {
      field: "quantity",
      cellRenderer: (props: any) => {
        if (props.data.quantity === "waiting..") {
          return <div>Waiting...</div>;
        } else if (props.data.quantityDiff === "waiting..") {
          return <div>{`$${props.data.quantity}`}</div>;
        } else {
          return (
            <div>
              {`${props.data.quantity}`}{" "}
              <span
                style={{ color: props.data.quantityDiff > 0 ? "green" : "red" }}
              >{`${props.data.quantityDiff > 0 ? "+" : "-"}${
                props.data.quantityDiff
              }%`}</span>
            </div>
          );
        }
      },
    },
  ];

  const getRowId: any = useCallback((params: any) => {
    return params.data.name;
  }, []);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );

  return (
    <>
      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        h="100vh"
        backgroundColor="#293143"
        color="#fff"
      >
        <Text fontSize="44">CryptoFinance</Text>
        <div className={"ag-theme-alpine-dark"} style={{ width: "60%" }}>
          <AgGridReact
            domLayout="autoHeight"
            getRowId={getRowId}
            ref={gridRef}
            rowData={prices}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
          />
        </div>
        <Button colorScheme="cyan" as={RouterLink} to="/">
          Back
        </Button>
      </Flex>
    </>
  );
};
export default CryptoFinance;
