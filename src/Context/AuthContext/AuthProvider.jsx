import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import auth from "../../firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({children}) => {

    // some states
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create user with email and password
    const signUpWithEmailAndPass = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sing in existing user
    const signInWithEmailAndPass = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // user observer or listener
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                console.log(currentUser);
            }else{
                console.log('something went wrong');
            }
        })
        return unSubscribe
    },[])

    const userInfo = {
        user,
        setUser, 
        loading, 
        setLoading,
        signUpWithEmailAndPass, 
        signInWithEmailAndPass
    }
    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;