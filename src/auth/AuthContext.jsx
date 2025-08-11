// import { createContext, useEffect, useState } from "react";
// import { auth } from "./FirebaseGoogleAuth/firebaseConfig";
// import {
//   signInWithPopup,
//   signOut,
//   GoogleAuthProvider,
//   onAuthStateChanged,
// } from "firebase/auth";
// import toast, { Toaster } from "react-hot-toast";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const loginWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);

//       toast.success("Usuário logado com sucesso!", {
//         style: {
//           padding: "20px",
//           color: "#FFFFFF",
//           background: "#1a7431",
//         },
//         iconTheme: {
//           primary: "#FFFFFF",
//           secondary: "#3a5a40"
//         },
//       });
//     } catch (error) {
//       toast.error("Erro ao logar com a conta do Google", {
//         style: {
//           padding: "20px",
//           color: "#FFFFFF",
//           background: "#bf0603"
//         },
//         iconTheme: {
//           primary: "#FFFFFF",
//           secondary: "#c81d25"
//         }
//       })
//       console.error("Erro no login:", error);
//     }
//   };

//   // Logout
//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Erro no logout:", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe(); 
//   }, []);

//   const value = {
//     user,
//     loginWithGoogle,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import { createContext, useEffect, useState } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Hook do Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
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
    },
    onError: (error) => {
      console.error('Login Failed:', error);
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
      });
    },
  });

  const loginWithGoogle = () => {
    googleLogin();
  };

  // Logout
  const logout = () => {
    try {
      googleLogout();
      setProfile(null);
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  // Buscar dados do perfil do usuário quando o user for definido
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // Verificar se há token salvo no localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    const savedProfile = localStorage.getItem('googleProfile');
    
    if (savedUser && savedProfile) {
      const parsedUser = JSON.parse(savedUser);
      const parsedProfile = JSON.parse(savedProfile);
      
      // Verificar se o token ainda é válido (opcional)
      // Você pode adicionar verificação de expiração aqui
      setUser(parsedUser);
      setProfile(parsedProfile);
    }
  }, []);

  // Salvar dados no localStorage quando profile for atualizado
  useEffect(() => {
    if (user && profile) {
      localStorage.setItem('googleUser', JSON.stringify(user));
      localStorage.setItem('googleProfile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('googleUser');
      localStorage.removeItem('googleProfile');
    }
  }, [user, profile]);

  const value = {
    user: profile, // Retorna os dados do perfil (similar ao Firebase)
    rawUser: user, // Token e dados brutos (caso precise)
    loginWithGoogle,
    logout,
    isAuthenticated: !!profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};