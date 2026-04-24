import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
        "https://mern-crud-app-cyxa.onrender.com/addpost",
        {
          name,
          email,
          role,
          password
        }
      );

      setLoading(false);
      console.log(res.data);

      navigate("/users");

    } catch (err) {
      setLoading(false);
      setError("Failed to create user");
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Inter, sans-serif;
        }

        .wrapper {
          min-height: 100vh;
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

        .card {
          width: 420px;
          padding: 30px;
          border-radius: 16px;

          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);

          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          color: #fff;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          font-size: 13px;
          margin-bottom: 5px;
          display: block;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .input-group input::placeholder {
          color: #ccc;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
          font-weight: 500;
          cursor: pointer;
          margin-top: 10px;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .btn:disabled {
          opacity: 0.6;
        }

        .error {
          color: #f87171;
          font-size: 13px;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>

      <div className="wrapper">
        <div className="card">

          <div className="title">Create User</div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default CreatePost;