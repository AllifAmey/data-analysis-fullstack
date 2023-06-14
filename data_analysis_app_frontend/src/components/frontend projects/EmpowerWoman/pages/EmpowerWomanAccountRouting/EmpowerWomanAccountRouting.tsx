import React from "react";
import { useParams } from "react-router-dom";
import EmpowerWomanSignUpForm from "./utility/EmpowerWomanSignUpForm";
import EmpowerWomanLoginForm from "./utility/EmpowerWomanLoginForm";

const EmpowerWomanAccountRouting = () => {
  /*
  
  Note for myself:

  1. Users can successfully login including the "admin" (She's not really admin thank fuck).
  2. The login and Signup pages both work but routing to the next stage is an issue
  
  To fix:

  backend and apis associated with that ( check if it's her or not) -
  Create event model
  Create event default

  frontend - 

  


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
