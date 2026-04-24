import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://mern-crud-app-cyxa.onrender.com/login",
        {
          email,
          password
        }
      );

      setLoading(false);

      // ✅ safer check
      if (res.status === 200 && res.data.user) {

        // store user
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // (future ready if you add JWT)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        navigate("/users");

      } else {
        setError(res.data.message || "Invalid credentials");
      }

    } catch (err) {
      setLoading(false);

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server not reachable");
      }
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Inter, sans-serif;
        }

        .auth-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;

          background: linear-gradient(
            135deg,
            #5f2eea,
            #7c3aed,
            #a855f7,
            #ec4899
          );

          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .auth-card {
          width: 380px;
          padding: 32px;
          border-radius: 16px;

          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);

          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          color: #fff;
          text-align: center;
        }

        .auth-title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 25px;
        }

        .input-group {
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 15px;
        }

        .input-group input {
          width: 100%;
          border: none;
          background: transparent;
          color: #fff;
          outline: none;
          font-size: 14px;
        }

        .input-group input::placeholder {
          color: #cbd5e1;
        }

        .btn-login {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;

          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
          font-weight: 500;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
        }

        .btn-login:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 20px rgba(168,85,247,0.4);
        }

        .btn-login:disabled {
          opacity: 0.6;
        }

        .error {
          color: #f87171;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .register {
          margin-top: 18px;
          font-size: 14px;
        }

        .register a {
          color: #c4b5fd;
          text-decoration: none;
        }

        .register a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">

          <div className="auth-title">Sign in</div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn-login" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          <div className="register">
            Don’t have an account? <Link to="/create">Create one</Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;