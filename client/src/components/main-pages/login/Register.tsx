import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [user, setUser] = useState<RegisterType>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = (el: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = el.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstRegistration", "true");

      window.location.href = "/";
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register">
        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleRegister}
              required
            />
            <label>Full Name</label>
          </div>
          <div className="textbox">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleRegister}
              required
            />
            <label>Email</label>
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleRegister}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">Register</button>

          <p className="footer">
            Go back to <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
