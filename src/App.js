import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './AuthContext';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Login from './components/login/Login';
import Router from './routes';
import { auth } from './service/firebase';
import ThemeProvider from './theme';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      setUser(authUser)
    })
  }, [user])

  useEffect(() => toast.success("👋 Angemeldet als Admin!"), [])

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      {user ? (
        <AuthProvider value={{ user }}>
          <ThemeProvider>
            <BaseOptionChartStyle />
            <Router />
          </ThemeProvider>
        </AuthProvider>
      ) : <Login />}
    </>
  );
}
