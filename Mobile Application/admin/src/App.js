import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8081/news';

function App() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE}/list`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const addNews = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        setTitle('');
        setContent('');
        fetchNews();
      }
    } catch (error) {
      console.error('Error adding news:', error);
    }
    setLoading(false);
  };

  const deleteNews = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>News Admin Panel</h1>
      </header>

      <main>
        <section className="add-news">
          <h2>Add News</h2>
          <form onSubmit={addNews}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add News'}
            </button>
          </form>
        </section>

        <section className="news-list">
          <h2>News List ({news.length})</h2>
          {news.map((item) => (
            <div key={item.id} className="news-item">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
              <button onClick={() => deleteNews(item.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;