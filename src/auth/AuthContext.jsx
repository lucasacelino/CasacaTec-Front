import { createContext, useEffect, useState } from "react";
import { auth } from "./FirebaseGoogleAuth/firebaseConfig";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      toast.success("Usuário logado com sucesso!", {
        style: {
          padding: "20px",
          color: "#FFFFFF",
          background: "#1a7431",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#3a5a40"
        },
      });
    } catch (error) {
      toast.error("Erro ao logar com a conta do Google", {
        style: {
          padding: "20px",
          color: "#FFFFFF",
          background: "#bf0603"
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#c81d25"
        }
      })
      console.error("Erro no login:", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  const value = {
    user,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
