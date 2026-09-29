import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('medicare_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('medicare_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((email === 'demo@medicare.com' && password === 'Demo@1234') || email.includes('@')) {
          const userData = {
            id: 1,
            name: 'Muhammad Ali Khan',
            email: email,
            phone: '+92 300 1234567',
            cnic: '35202-1234567-8',
            dob: '1985-05-15',
            gender: 'Male',
            bloodGroup: 'B+',
            address: 'House 123, Street 4, Gulberg, Lahore',
            emergencyContact: {
              name: 'Fatima Khan',
              relation: 'Spouse',
              phone: '+92 301 9876543',
            },
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
          };
          setUser(userData);
          localStorage.setItem('medicare_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const signup = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        };
        setUser(newUser);
        localStorage.setItem('medicare_user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicare_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('medicare_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
