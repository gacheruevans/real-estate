import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL 
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log('Could not sign in with Google', error)
        }
    };
  return (
    <button 
        onClick={handleGoogleClick} 
        type="button" 
        className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-700 text-white hover:bg-red-600 w-full"> <span>Continue with Google</span></button>
  )
}
