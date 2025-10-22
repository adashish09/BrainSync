import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  function signup(email, password, role) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Store user role in localStorage for simplicity
      localStorage.setItem('userRole', role);
      setUserRole(role);
      return userCredential;
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      // Get user role from localStorage
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    });
  }

  function logout() {
    localStorage.removeItem('userRole');
    setUserRole(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}