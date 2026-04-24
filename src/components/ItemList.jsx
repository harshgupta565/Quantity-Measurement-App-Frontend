import React, { useEffect, useState } from 'react';
import { getItems } from '../services/api.js';

const ItemList = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items. Check API connection.');
        // For development purpose, add dummy data if backend is down
        console.warn('Using dummy data due to API error');
        setItems([
          { id: 1, name: 'Sugar', quantity: 2, unit: 'kg' },
          { id: 2, name: 'Milk', quantity: 1.5, unit: 'liter' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refreshTrigger]);

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div className="card">
      <h2>Item Inventory</h2>
      {error && <div className="error-warning">{error} - Showing mock data</div>}
      
      {items.length === 0 ? (
        <p className="empty-state">No items found. Add some above!</p>
      ) : (
        <ul className="item-list">
          {items.map((item, index) => (
            <li key={item.id || index} className="item">
              <span className="item-name">{item.name}</span>
              <span className="item-badge">
                {item.quantity} {item.unit}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
