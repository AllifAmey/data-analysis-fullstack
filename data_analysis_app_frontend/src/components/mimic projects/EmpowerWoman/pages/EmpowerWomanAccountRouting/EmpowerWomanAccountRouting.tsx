import React from "react";
import { useParams } from "react-router-dom";
import EmpowerWomanSignUpForm from "./utility/EmpowerWomanSignUpForm";
import EmpowerWomanLoginForm from "./utility/EmpowerWomanLoginForm";
import EmpowerWomanAdmin from "./utility/EmpowerWomanAdmin";
import EmpowerWomanUser from "./utility/EmpowerWomanUser";

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

  if (params.accessAccount == "admin") {
    return (
      <>
        <EmpowerWomanAdmin />
      </>
    );
  }

  if (params.accessAccount == "user") {
    return (
      <>
        <EmpowerWomanUser />
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
