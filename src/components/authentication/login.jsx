import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { storeToken, storeUser } from "../../authentication/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      storeToken(data.token);
      storeUser(data.user);
      setLoading(false);
      setEmail("");
      setPassword("");
      navigate("/posts");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
      </fieldset>
      <NavLink className="link link-info" to="/auth/register">
        Register
      </NavLink>
    </form>
  );
};

export default Login;
