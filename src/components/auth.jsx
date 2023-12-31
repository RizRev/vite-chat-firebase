import { useState } from "react";
import {auth, googleProvider} from "../config/firebase-config"
import { signOut,createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
export const Auth = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    // console.log(auth?.currentUser?.displayName)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email,password)
        } catch (error) {
            console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }    

    return (
        <div>
            <input 
            placeholder="Email..." 
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logout}>logout</button>
        </div>
    );
};