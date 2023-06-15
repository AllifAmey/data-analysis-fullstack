import { Button } from "@chakra-ui/react";

const RunnersRender = (props: any) => {
  /**
   * Display horse racing data
   *
   *
   */

  return (
    <>
      <Button
        onClick={() => {
          console.log(props.data.runners);
        }}
      >
        Horse data
      </Button>
    </>
  );
};

export default RunnersRender;
