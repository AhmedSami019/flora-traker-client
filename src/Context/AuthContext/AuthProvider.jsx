import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import auth from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  // some states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password
  const signUpWithEmailAndPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sing in existing user
  const signInWithEmailAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut user
  const singOutUser = () => {
    return signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Successful",
          icon: "success",
          text: "User singOut successful!",
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };

  // user observer or listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false)
    });
    return unSubscribe;
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    singOutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
