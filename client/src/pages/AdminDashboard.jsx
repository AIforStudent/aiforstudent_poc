import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Admin.css';

const API_BASE = "http://localhost:5001/api";

const collections = {
  "ai-news": ["title", "excerpt", "link", "date", "source", "author", "image"],
  "blogs": ["title", "excerpt", "content", "author", "date"],
  "courses": ["title", "description", "link", "image"],
  "roadmaps": ["title", "steps", "image"]
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState("ai-news");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check', { withCredentials: true });
        if (!response.data.isAdmin) {
          navigate('/admin');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/admin');
      }
    };
    checkAuth();
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${selectedCollection}`);
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setForm({});
    setEditId(null);
  }, [selectedCollection]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    collections[selectedCollection].forEach(field => {
      payload[field] = form[field] && form[field].trim() !== "" ? form[field] : null;
    });
    if (selectedCollection === "ai-news" && !payload.date) {
      payload.date = new Date().toISOString(); // ensure date exists
    }
    if (!payload.title || payload.title === "") {
      alert("Title is required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE}/${selectedCollection}/${editId}`, payload);
      } else {
        await axios.post(`${API_BASE}/${selectedCollection}`, payload);
      }
      setForm({});
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving:", error.response?.data || error);
      alert("Failed to save. Check console.");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id?.$oid || item._id || item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${selectedCollection}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true });
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getId = (item) => item._id?.$oid || item._id || item.id;

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">🛠️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="mb-6">
        <label className="mr-2">Select Collection:</label>
        <select
          value={selectedCollection}
          onChange={e => setSelectedCollection(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-2 py-1"
        >
          {Object.keys(collections).map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <h2 className="text-xl mb-4">{editId ? "Edit" : "Add New"} {selectedCollection}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {collections[selectedCollection].map(field => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          ))}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>

      <h2 className="text-2xl mb-4">Existing {selectedCollection}</h2>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={getId(item)} className="bg-gray-800 p-4 rounded flex justify-between items-center">
            <div>
              <strong className="text-lg">{item.title || "Untitled"}</strong>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(getId(item))}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
