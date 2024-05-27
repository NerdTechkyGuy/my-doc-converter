// src/App.js
import React from 'react';
import './App.css';
import SA_template from './SA_Template';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Legal Drafting Software</h1>
        <p>India's First Legal Drafting Platform</p>

        <p style={{ textDecoration: 'underline' }}>SUPPLEMENTARY AFFIDAVIT TEMPLATE</p>

        <SA_template />
      </header>
    </div>
  );
}

export default App;
