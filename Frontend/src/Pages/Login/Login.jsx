import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { login } from "../../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //handleSubmit
  const handleSubmit = () => {
    if (email === "" || password === "") {
      setError("Please fill all the fields");
      return;
    }
    setError(null);
    console.log("Login Successfull");
    login(email, password)
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message);

      });


  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center">
        <div className="w-96 bg-white border-[1px] border-black/10 p-4 justify-center flex flex-col mt-24 gap-5">
          <h2 className="text-3xl font-semibold text-center ">Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="py-2 px-3 bg-transparent border-2 border-black/10 text-black rounded-lg outline-none"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <PasswordInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></PasswordInput>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="bg-blue-500 py-2 text-center text-white font-semibold rounded-lg"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p>
            Not have Account yet?{" "}
            <Link
              className="underline text-blue-500 font-semibold"
              to="/signup"
            >
              SignUp Your Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
