import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./authentication.css";

interface LoginType {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleLogin = (el: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = el.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", "true");

      window.location.href = "/";
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleLogin}
              required
            />
            <label>Email</label>
          </div>

          <div className="textbox">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleLogin}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">Login</button>

          <p className="footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          {/* <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div> */}
        </form>
      </div>
    </div>
  );
}
