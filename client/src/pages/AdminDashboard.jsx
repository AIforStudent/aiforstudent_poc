
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:5001/api";

const collections = {
  "ai-news": ["title", "excerpt", "link", "date", "source", "author", "image"],
  "blogs": ["title", "excerpt", "content", "author", "date"],
  "courses": ["title", "description", "link", "image"],
  "roadmaps": ["title", "steps", "image"]
};

function AdminDashboard() {
  const [selectedCollection, setSelectedCollection] = useState("ai-news");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

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
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${selectedCollection}/${editId}`, form);
      } else {
        await axios.post(`${API_BASE}/${selectedCollection}`, form);
      }
      setForm({});
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id || item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${selectedCollection}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛠️ Admin Dashboard</h1>

      <label>Select Collection:</label>
      <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
        {Object.keys(collections).map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>

      <h2>{editId ? "Edit" : "Add New"} {selectedCollection}</h2>
      <form onSubmit={handleSubmit}>
        {collections[selectedCollection].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field] || ''}
            onChange={handleChange}
            style={{ display: "block", marginBottom: 10 }}
          />
        ))}
        <button type="submit">Save</button>
      </form>

      <h2>Existing {selectedCollection}</h2>
      {data.map((item) => (
        <div key={item._id || item.id} style={{ marginBottom: 10 }}>
          <strong>{item.title || item.name}</strong>
          <button onClick={() => handleEdit(item)} style={{ marginLeft: 10 }}>Edit</button>
          <button onClick={() => handleDelete(item._id || item.id)} style={{ marginLeft: 5 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
