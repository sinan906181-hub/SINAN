import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { UserProfile, UserRole, UserPlan } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemo: (role?: UserRole) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync or Create user document in Firestore
  const syncUserProfile = async (firebaseUser: User, extraName?: string): Promise<UserProfile> => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        setUserProfile(data);
        return data;
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: extraName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Nexora User',
          photoURL: firebaseUser.photoURL || undefined,
          role: 'user',
          plan: 'pro',
          bio: 'Building future-ready AI and Cloud applications on Nexora.',
          title: 'Product Engineer',
          company: 'Nexora Labs',
          createdAt: new Date().toISOString(),
          settings: {
            theme: 'dark',
            emailNotifications: true,
            aiAutoSuggestions: true,
            twoFactorAuth: false,
          }
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('Firestore user fetch failed, fallback to local profile:', err);
      const fallback: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || 'user@nexora.ai',
        displayName: extraName || firebaseUser.displayName || 'Alex Vance',
        role: 'user',
        plan: 'pro',
        createdAt: new Date().toISOString(),
      };
      setUserProfile(fallback);
      return fallback;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        // Check if demo user is stored in local storage
        const demoUser = localStorage.getItem('nexora_demo_user');
        if (demoUser) {
          try {
            const parsed = JSON.parse(demoUser) as UserProfile;
            setUserProfile(parsed);
          } catch {
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserProfile(cred.user);
    localStorage.removeItem('nexora_demo_user');
  };

  const signUpEmail = async (email: string, pass: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await syncUserProfile(cred.user, name);
    localStorage.removeItem('nexora_demo_user');
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(cred.user);
    localStorage.removeItem('nexora_demo_user');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
    localStorage.removeItem('nexora_demo_user');
    setUser(null);
    setUserProfile(null);
  };

  const loginAsDemo = async (role: UserRole = 'admin') => {
    const demoProfile: UserProfile = {
      uid: `demo-${Date.now()}`,
      email: role === 'admin' ? 'admin@nexora.ai' : 'sarah.engineer@nexora.ai',
      displayName: role === 'admin' ? 'Elena Rostova (Admin)' : 'Sarah Vance',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role,
      plan: 'enterprise',
      bio: 'Lead Cloud Architect & AI Systems Specialist exploring next-gen SaaS automation on Nexora.',
      title: role === 'admin' ? 'Platform Administrator' : 'Senior Cloud Engineer',
      company: 'Quantum Dynamics',
      createdAt: new Date().toISOString(),
      settings: {
        theme: 'dark',
        emailNotifications: true,
        aiAutoSuggestions: true,
        twoFactorAuth: true,
      }
    };
    localStorage.setItem('nexora_demo_user', JSON.stringify(demoProfile));
    setUserProfile(demoProfile);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...data, updatedAt: new Date().toISOString() };
    setUserProfile(updated);

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, data);
      } catch (err) {
        console.error('Failed to update user profile in Firestore:', err);
      }
    } else {
      localStorage.setItem('nexora_demo_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInEmail,
        signUpEmail,
        signInWithGoogle,
        resetPassword,
        logout,
        loginAsDemo,
        updateUserProfile,
        updateProfileData: updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
