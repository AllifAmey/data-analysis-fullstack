import React from "react";

// ? is optional but when given it has to be as defined.

type props = {
  example: string;
  example_optional?: number;
};

const HomePage = ({ example }: props) => {
  /*
  
  
  */

  //styles

  return (
    <>
      <div>{example}</div>
    </>
  );
};

export default HomePage;
