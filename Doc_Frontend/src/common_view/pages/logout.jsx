// logout.js
// Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();            // ✅ Clear user data
    navigate('/');                   // ✅ Navigate to home or login page
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;



// const handleLogout = async () => {
//   try {
//     await fetch('/api/logout/', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Token ${localStorage.getItem('token')}`  // or use cookies if session-based
//       }
//     });
//     localStorage.removeItem('token');  // Clean local token
//     window.location.href = '/Frontpage';  // Redirect to front page
//   } catch (error) {
//     console.error('Logout failed', error);
//   }
// };
// export default handleLogout;


