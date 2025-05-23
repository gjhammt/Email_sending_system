import { useState } from 'react';
import './index.css';
import LeadForm from './components/LeadForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleAdminLogin = (token) => {
    setIsAdminLoggedIn(true);
    setAdminToken(token);
    setShowLogin(false);  // close modal on login success
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminToken('');
  };

  return (
    <>
      <div className="p-4">
        {!isAdminLoggedIn && (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Admin Login
          </button>
        )}

        {isAdminLoggedIn && (
          <>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
            <AdminDashboard token={adminToken} />
          </>
        )}

        {!isAdminLoggedIn && <LeadForm />}
      </div>

      {showLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
 export default App