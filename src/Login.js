// // Login.js
// import React, { useState } from 'react';
// import '../src/login.css'

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Perform validation against fixed username and password
//     if (username === 'admin' && password === 'password') {
//       onLogin();
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className='login-h1-tag-css'>Login</h2>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import '../src/login.css'

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     // Perform validation against fixed username and password
//     if (username === 'admin' && password === 'password') {
//       setLoading(true); // Set loading state to true
//       setTimeout(() => {
//         setLoading(false); // Reset loading state after 4 seconds
//         onLogin();
//       }, 4000);
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className='login-h1-tag-css'>Login</h2>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin} disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import '../src/login.css'; // Import your existing CSS file
import '../src/login.css'; // Import the loader CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Perform validation against fixed username and password
    if (username === 'admin' && password === 'password') {
      setLoading(true); // Set loading state to true
      setTimeout(() => {
        setLoading(false); // Reset loading state after 4 seconds
        onLogin();
      }, 3000);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className='login-h1-tag-css'>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          'Login'
        )}
      </button>
    </div>
  );
}

export default Login;
