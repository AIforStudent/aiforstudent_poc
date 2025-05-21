import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Admin.css';

// Use environment variable for API base URL
const API_BASE = process.env.REACT_APP_API_URL || 'https://aiforstudent-poc.onrender.com/api';

// Configure axios defaults
axios.defaults.withCredentials = true;

const collections = {
  "ai-news": ["title", "excerpt", "link", "date", "source", "author", "image"],
  "blogs": ["title", "excerpt", "coverImage", "category", "author.name", "author.avatar", "author.title", "date", "readTime", "tags", "externalLink"],
  "courses": ["title", "description", "link", "image"],
  "roadmaps": ["title", "steps", "image"]
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState("ai-news");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE}/auth/check`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.data.isAdmin) {
          navigate('/admin');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setError('Authentication failed. Please log in again.');
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE}/${selectedCollection}/`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
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

    for (const field of collections[selectedCollection]) {
      const val = form[field]?.trim?.() || null;

      if (selectedCollection === "blogs") {
        if (field === "tags") {
          payload.tags = val ? val.split(",").map(tag => tag.trim()) : [];
        } else if (field.startsWith("author.")) {
          payload.author = payload.author || {};
          const subfield = field.split(".")[1];
          payload.author[subfield] = val;
        } else if (field === "readTime") {
          payload.readTime = val ? parseInt(val) : 0;
        } else if (field === "date") {
          payload.date = val ? new Date(val).toISOString() : new Date().toISOString();
        } else {
          payload[field] = val;
        }
      } else {
        payload[field] = val;
      }
    }

    if (!payload.title) {
      alert("Title is required");
      return;
    }

    try {
      setIsLoading(true);
      const url = `${API_BASE}/${selectedCollection}/` + (editId ? `/${editId}` : "");
      const method = editId ? axios.put : axios.post;
      await method(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setForm({});
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving:", error.response?.data || error);
      setError('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    try {
      const id = getId(item);
      if (!id) throw new Error("Invalid ID structure");
      setForm(item);
      setEditId(id);
    } catch (err) {
      console.error("Failed to initiate edit:", err);
      alert("This entry cannot be edited due to data issues.");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("Invalid ID");
      setIsLoading(true);
      await axios.delete(`${API_BASE}/${selectedCollection}/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
      setError('Failed to delete. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.get(`${API_BASE}/auth/logout`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getId = (item) => {
    if (item._id && typeof item._id === 'object' && '$oid' in item._id) return item._id.$oid;
    return item._id || item.id || null;
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-black text-white min-h-screen">
        <div className="bg-red-600 p-4 rounded mb-4">{error}</div>
        <button onClick={() => setError(null)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Try Again
        </button>
      </div>
    );
  }

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
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
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
                disabled={isLoading}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(getId(item))}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                disabled={isLoading}
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
