import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api"; // 1. Importa as funções do serviço
import desk_logo from "../../assets/desktop_logo.svg";
import mobile_logo from "../../assets/mobile_logo.svg";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 2. Usa a função do serviço em vez de 'fetch'
      const data = await loginUser(loginUsername, loginPassword);
      localStorage.setItem("token", data.access_token);
      navigate("/todo");
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (registerPassword !== registerConfirmPassword) {
      setError("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      // 3. Usa a função do serviço em vez de 'fetch'
      await registerUser({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        confirm_password: registerConfirmPassword,
      });
      setError("Registro concluído com sucesso! Faça login para continuar.");
      setIsLogin(true); // Muda para a tela de login após o sucesso
    } catch (error) {
      setError(error.message || "Registro falhou!");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Limpa os erros ao trocar de formulário
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

          {isLogin ? (
            <div>
              <h2 className="text-white text-[24px] font-semibold text-left mb-5">Faça seu login</h2>
            <form
              className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-white text-[20px] font-semibold ">
                  Login
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
          </div>
          ) : (
            <div>
              <h2 className="text-white text-[24px] font-semibold text-left mb-5">Crie sua conta</h2>
            <form
              className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center"
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
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white text-[20px] font-semibold mt-3">
                  Senha
                </label>
                <br />
                <input
                  className="bg-[#1E1E26] w-[300px] h-[40px] rounded"
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
              <div>
                <label className="text-white text-[20px] font-semibold mt-3">
                  Confirme sua Senha
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
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
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
          )}

          <button 
            onClick={toggleForm}
            style={{ 
              color: "white", 
              marginTop: "20px", 
              fontWeight: "600",
            }}
          >
            {isLogin ? "Criar sua Conta" : "Fazer login"}
          </button>
        </div>
        <div className="max-md:hidden w-2/3 flex items-end justify-end my-20">
          <img className="max-lg:w-[180px]" src={desk_logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;
