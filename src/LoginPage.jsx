import axios from "axios";
import { useState } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        console.log("Logged IN");
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        login(response.data.user);
        event.target.reset();
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 0);
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  // ... rest of the component remains the same

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
