import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Readmore = () => {
  let { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/fullblog', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div 
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px'
      }}
    >
      <h2 
        style={{
          color: '#333', marginBottom: '20px', fontSize: '28px', fontWeight: 'bold'
        }}
      >
        View Blog
      </h2>

      <div 
        style={{
          width: '100%', maxWidth: '600px', backgroundColor: '#fff', borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden', textAlign: 'center'
        }}
      >
        <img 
          src={items.photo} 
          alt={items.title} 
          style={{
            width: '100%', height: '200px', objectFit: 'cover'
          }} 
        />
        <div style={{ padding: '20px' }}>
          <p 
            style={{
              fontSize: '16px', color: '#555', lineHeight: '1.6'
            }}
          >
            {items.content}
          </p>
          <button 
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px',
              borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '10px'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Readmore;
