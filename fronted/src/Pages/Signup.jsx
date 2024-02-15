import { useState } from "react";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  cosnt[(firstName, setFirstName)] = useState("");
  cosnt[(lastName, setLastName)] = useState("");
  cosnt[(email, setEmail)] = useState("");
  cosnt[(password, setPassword)] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            placeholder="John"
            label="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            placeholder="Doe"
            label="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            placeholder="sam@gmail.com"
            label={"Email"}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={clickfunc} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

async function clickfunc() {
  const nav = useNavigate();
  const res = await axios.post("http://localhost:8080/api/v1/user/signup", {
    firstName,
    lastName,
    email,
    password,
  });
  localStorage.setItem();
  nav("/signin");
}
