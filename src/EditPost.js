import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  /* =========================
     FETCH USER
  ========================= */
  useEffect(() => {

    setLoading(true);

    axios.get(`https://mern-crud-app-cyxa.onrender.com/getpost/${id}`)
      .then(res => {
        setName(res.data[0].name);
        setEmail(res.data[0].email);
        setRole(res.data[0].role);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to load user");
        setLoading(false);
      });

  }, [id]);

  /* =========================
     UPDATE USER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(
        `https://mern-crud-app-cyxa.onrender.com/updatepost/${id}`,
        { name, email, role }
      );

      setLoading(false);
      navigate("/users");

    } catch (err) {
      console.log(err);
      setError("Failed to update user");
      setLoading(false);
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

          <div className="title">Edit User</div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button className="btn" disabled={loading}>
                {loading ? "Updating..." : "Update User"}
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
};

export default EditPost;