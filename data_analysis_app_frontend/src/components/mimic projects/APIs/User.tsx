import React from "react";
import domain from "../../../domain";

// template to create apis

export async function SignUp(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  signUpDetails: any
): Promise<any> {
  setIsLoading(true);
  const response = await fetch(`${domain}/api/user/EmpowerWoman/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: signUpDetails.email,
      password: signUpDetails.pass,
      first_name: signUpDetails.firstName,
      last_name: signUpDetails.lastName,
    }),
  });
  const data = await response.json();
  setIsLoading(false);
  return data;
}

export async function Login(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loginDetails: any
): Promise<any> {
  const response = await fetch(`${domain}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: loginDetails.email,
      password: loginDetails.pass,
    }),
  });
  const data = await response.json();

  return data;
}
