import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import desk_logo from "../../assets/desktop_logo.svg";
import mobile_logo from "../../assets/mobile_logo.svg";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 

  const navigate = useNavigate();

  const validateForm = (username, password) => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm(loginUsername, loginPassword)) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append("username", loginUsername);
    formDetails.append("password", loginPassword);

    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        navigate("/todo");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Authentication failed!");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm(registerUsername, registerPassword)) return;

    setLoading(true);

    const formDetails = {
      username: registerUsername,
      password: registerPassword,
    };

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      setLoading(false);

      if (response.ok) {
        setError("Registration successful! You can now log in.");
        setIsLogin(true);
      } else {
        const errorData = await response.json();
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map((err) => err.msg).join(", ");
          setError(errorMessages || "Registration failed!");
        } else {
          setError(errorData.detail || "Registration failed!");
        }
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-[#16161c] h-[100vh] flex items-center px-10">
      <div className="flex justify-center items-center w-[1200px] m-auto">
        <div className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
          <div className="flex items-start justify-end w-full ">
            <img className="md:hidden mt-[-150px] mb-20" src={mobile_logo} alt="logo" />
          </div>
          <p className="max-md:hidden text-white text-[52px] font-semibold mb-10">
            do it!
          </p>
          <form
            className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-white text-[20px] font-semibold ">
                Email
              </label>
              <br />
              <input
                className="bg-[#1E1E26] w-[300px] h-[40px] rounded"
                style={{
                  color: "white",
                  border: "none",
                  padding: "0 10px",
                }}
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-white text-[20px] font-semibold mt-3">
                Senha
              </label>
              <br />
              <input
                className="bg-[#1E1E26] w-[300px] h-[40px] rounded mb-10"
                style={{
                  color: "white",
                  border: "none",
                  padding: "0 10px",
                }}
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button
              style={{
                color: "#16161C",
                fontWeight: "600",
                padding: "10px 100px",
                width: "300px",
                border: "none",
                borderRadius: "5px",
                background:
                  "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
              }}
              type="submit"
              disabled={loading}
              id="login-form-submit"
            >
              {loading ? "Logando" : "Continuar"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <form
            className="hidden max-md:flex max-md:flex-col max-md:items-center max-md:justify-center"
            onSubmit={handleRegister}
          >
            <div>
              <label className="text-white text-[20px] font-semibold">
                Nome de Usuário
              </label>
              <br />
              <input
                className="bg-[#1E1E26] w-[300px] h-[40px] rounded"
                style={{
                  color: "white",
                  border: "none",
                  padding: "0 10px",
                }}
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-white text-[20px] font-semibold mt-3">
                Senha
              </label>
              <br />
              <input
                className="bg-[#1E1E26] w-[300px] h-[40px] rounded mb-10"
                style={{
                  color: "white",
                  border: "none",
                  padding: "0 10px",
                }}
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button
              style={{
                color: "#16161C",
                fontWeight: "600",
                padding: "10px 100px",
                width: "300px",
                border: "none",
                borderRadius: "5px",
                background:
                  "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
              }}
              type="submit"
              disabled={loading}
              id="register-form-submit"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="max-md:hidden w-2/3 flex items-end justify-end my-20">
          <img className="max-lg:w-[180px]" src={desk_logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;
