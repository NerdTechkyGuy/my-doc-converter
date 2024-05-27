// import React from 'react';
// import './App.css';
// import SA_template from './SA_Template';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Legal Drafting Software</h1>
//         <p>India's First Legal Drafting Platform</p>

//         <p style={{ textDecoration: 'underline' }}>SUPPLEMENTARY AFFIDAVIT TEMPLATE</p>

//         <SA_template />
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SA_template from './SA_Template';
import Login from './Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginTime = localStorage.getItem('loginTime');
    if (loggedInUser && loginTime) {
      const currentTime = new Date().getTime();
      const sessionTimeout = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
      if (currentTime - parseInt(loginTime) < sessionTimeout) {
        setLoggedIn(true);
      } else {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loginTime');
      }
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('loggedInUser', 'admin');
    localStorage.setItem('loginTime', new Date().getTime().toString());
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loginTime');
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Legal Drafting Software</h1>
        <p>India's First Legal Drafting Platform</p>
        {loggedIn ? (
          <>
            <p style={{ textDecoration: 'underline' }}>SUPPLEMENTARY AFFIDAVIT TEMPLATE</p>
            <SA_template />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
