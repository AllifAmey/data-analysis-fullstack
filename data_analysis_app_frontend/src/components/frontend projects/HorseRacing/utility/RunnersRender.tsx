import { useDisclosure, Button } from "@chakra-ui/react";

import RunnersBarChart from "./RunnersBarChart";
import { Bar } from "react-chartjs-2";

const RunnersRender = (props: any) => {
  /**
   * Display horse racing data
   *
   *
   */

  // <Bar />
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        colorScheme="orange"
        onClick={() => {
          console.log(props.data.runners);
          onOpen();
        }}
      >
        Horses
      </Button>
      <RunnersBarChart data={props.data} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default RunnersRender;
