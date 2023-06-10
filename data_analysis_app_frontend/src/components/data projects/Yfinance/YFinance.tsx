import React, { useState, useCallback, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function YFinance(props: any) {
  /*
  Grabbing financial data.
  
  */
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    "wss://streamer.finance.yahoo.com/"
  );

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<any>(
    socketUrl,
    {
      share: true,
      filter: () => false,
    }
  );
  const handleClickSendMessage = useCallback(() => {
    sendJsonMessage({ subscribe: ["aapl"] });
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <Flex justifyContent="space-evenly" alignItems="center" h="100vh">
      <Button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Send message
      </Button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <ul></ul>
    </Flex>
  );
}

export default YFinance;
