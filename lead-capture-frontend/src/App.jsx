import { useState } from 'react';
import './index.css';
import LeadForm from './components/LeadForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


import { Button } from '@/components/ui/button';

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
      <div className="min-h-screen p-4 bg-gray-50 relative">
        {isAdminLoggedIn ? (
          <>
            <AdminDashboard token={adminToken} admin={{ name: 'Admin Name', email: 'admin@example.com' }} onLogout={handleLogout}/>
          </>
        ) : (
          <>
            <LeadForm />
            <Button
              onClick={() => setShowLogin(true)}
              className="fixed bottom-4 right-4 shadow-lg"
              variant="default"
            >
              Admin Login
            </Button>
          </>
        )}
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