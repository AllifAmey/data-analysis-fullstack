import React from "react";
import { useParams } from "react-router-dom";
import EmpowerWomanSignUpForm from "./utility/EmpowerWomanSignUpForm";
import EmpowerWomanLoginForm from "./utility/EmpowerWomanLoginForm";

const EmpowerWomanAccountRouting = () => {
  /*
  
  
  */

  //styles

  const params = useParams();

  if (params.accessAccount == "login") {
    return (
      <>
        <EmpowerWomanLoginForm />
      </>
    );
  }

  if (params.accessAccount == "signup") {
    return (
      <>
        <EmpowerWomanSignUpForm />
      </>
    );
  }

  return (
    <>
      <div>Wrong page</div>
    </>
  );
};

export default EmpowerWomanAccountRouting;
