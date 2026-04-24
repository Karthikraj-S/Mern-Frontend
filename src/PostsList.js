import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsList = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  /* =========================
     FETCH USERS
  ========================= */
  useEffect(() => {

    axios.get("https://mern-crud-app-cyxa.onrender.com/getposts")
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to load users");
        setLoading(false);
      });

  }, []);

  /* =========================
     DELETE USER
  ========================= */
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(
        `https://mern-crud-app-cyxa.onrender.com/deletepost/${id}`
      );

      setPosts(posts.filter(post => post.id !== id));

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  /* =========================
     ROLE FILTER
  ========================= */
  const visiblePosts =
    user?.role === "admin"
      ? posts
      : posts.filter(post => post.email === user?.email);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Inter, sans-serif;
        }

        .wrapper {
          min-height: 100vh;
          padding: 40px;

          background: linear-gradient(
            135deg,
            #5f2eea,
            #7c3aed,
            #a855f7,
            #ec4899
          );
        }

        .card {
          background: rgba(15, 23, 42, 0.9);
          padding: 25px;
          border-radius: 16px;
          color: white;
          backdrop-filter: blur(10px);
        }

        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
        }

        th {
          background: rgba(255,255,255,0.1);
        }

        tr {
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .btn {
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          margin-right: 5px;
        }

        .btn-primary {
          background: #8b5cf6;
          color: white;
        }

        .btn-warning {
          background: orange;
          color: white;
        }

        .btn-danger {
          background: red;
          color: white;
        }

        .error {
          color: #f87171;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="wrapper">
        <div className="card">

          <div className="title">User List</div>

          {error && <div className="error">{error}</div>}

          {user?.role === "admin" && (
            <Link to="/create">
              <button className="btn btn-primary">Create User</button>
            </Link>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {user?.role === "admin" && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {visiblePosts.map(post => (
                  <tr key={post.id}>

                    <td>{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.role}</td>

                    {user?.role === "admin" && (
                      <td>

                        <Link to={`/edit/${post.id}`}>
                          <button className="btn btn-warning">Edit</button>
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>

                      </td>
                    )}

                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </div>
    </>
  );
};

export default PostsList;