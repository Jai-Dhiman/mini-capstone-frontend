import axios from "./axiosConfig";
import { useState } from "react";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <small> {20 - name.length} characters remaining</small>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password:{" "}
          <input name="password" type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <small>Must be at least 6 characters long, length: {password.length} characters</small>
        <div>
          Password confirmation: <input name="password_confirmation" type="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
