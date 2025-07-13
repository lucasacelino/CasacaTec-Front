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
          padding: "16px",
          color: "#FFFFFF",
          background: "#6a994e",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // console.log("Erro");
      console.error("Erro no logout:", error);
    }
  };

  // Observa mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setLoading(false); // Finaliza o carregamento
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, []);

  // Valores disponíveis para os componentes filhos
  const value = {
    user,
    loginWithGoogle,
    logout,
    // loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
