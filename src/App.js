import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Login from './components/login/Login';
import Router from './routes';
import ThemeProvider from './theme';
import { auth } from './service/firebase';
import { AuthProvider } from './AuthContext'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      setUser(authUser)
    })
  }, [user])

  return (
    <div className="app">
      {user ? (
        <AuthProvider value={{ user }}>
          <ThemeProvider>
            <BaseOptionChartStyle />
            <Router />
          </ThemeProvider>
        </AuthProvider>
      ) : <Login />}
    </div>
  );
}
