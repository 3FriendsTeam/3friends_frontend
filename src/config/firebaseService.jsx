import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        await setPersistence(auth, browserLocalPersistence);
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in with Google: ", errorCode, errorMessage);
        throw new Error(errorCode).message;
    }
};

export { signInWithGoogle };
