import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import auth from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const AuthProvider = ({ children }) => {
  // some states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const instanceAxios = useAxios()

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

  // sign in with google
  const provider = new GoogleAuthProvider();
  const singInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
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
        const loggedUser = {email: currentUser.email}
        instanceAxios.post('/getToken', loggedUser)
        .then(result =>{
          const token = result.data.token
          localStorage.setItem("token", token)
        })
      } else {
        setUser(null);
      }
      setLoading(false)
    });
    return unSubscribe;
  }, [instanceAxios]);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    singInWithGoogle,
    singOutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
