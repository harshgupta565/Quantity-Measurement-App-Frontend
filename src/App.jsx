import React, { useState } from 'react';
import AddItem from './components/AddItem.jsx';
import ItemList from './components/ItemList.jsx';
import Converter from './components/Converter.jsx';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    // Incrementing trigger forces ItemList to re-fetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quantity Measurement</h1>
        <p>Manage your inventory & convert units easily.</p>
      </header>
      
      <main className="app-main">
        <div className="left-column">
          <AddItem onAddSuccess={handleItemAdded} />
          <Converter />
        </div>
        <div className="right-column">
          <ItemList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}

export default App;
