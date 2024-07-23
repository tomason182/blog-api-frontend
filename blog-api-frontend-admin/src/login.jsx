import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [token, setToken] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        const url = "http://localhost:5000/api/users/profile";
        try {
          const response = await fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }

          const data = await response.json();
          setProfile(data);
          setToken(!token);
          setError("");
        } catch (err) {
          setError(err);
        }
      }
    }
    getUserProfile();
  }, [token]);

  useEffect(() => {
    if (profile !== null) {
      navigate("/app");
    }
  }, [profile, navigate]);

  async function getAuthentication(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const url = "http://localhost:5000/api/users/login";
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(!token);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <h1>Please Sign In</h1>
      <form onSubmit={getAuthentication} className="login-form">
        <input
          type="email"
          id="username"
          name="username"
          required
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Login;
