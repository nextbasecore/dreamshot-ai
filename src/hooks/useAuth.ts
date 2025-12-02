
import { customToast } from "@/common";
import { auth, googleAuthProvider } from "@/firebase";
import { handleAuthError } from "@/utils/firebaseErrorHandler";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";


import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    // sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    // signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";




const useAuth = () => {

    // * Atoms
    const { handleDialogType } = useHandleDialogType();


    // * Functions
    const createAccount = async (
        email: string,
        password: string,
        rePassword: string,
    ) => {
        if (!email || !password || !rePassword) {
            customToast.error("Please fill all fields");
            return;
        }

        if (password !== rePassword) {
            customToast.error("Password do not match");
            return;
        }

        if (password.length < 8) {
            customToast.error("Password must be at least 8 characters");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            customToast.success("Account created");
            console.log(userCredential.user);
            // await logTrackInRewardful(email);
            await sendEmailVerification(userCredential.user);
            customToast.success("Verification email sent");
            handleDialogType("verifyEmail", "add");
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };



    const login = async (email: string, password: string) => {
        if (!email || !password) return customToast.error("Please fill all fields");

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (!userCredential.user.emailVerified) {
                return handleDialogType("verifyEmail", "add");
            }
            customToast.success("Logged in");
            handleDialogType("login", "remove");
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };

    const sendPasswordResetLink = async (email: string) => {
        if (!email) return customToast.error("Please fill all fields");

        try {
            await sendPasswordResetEmail(auth, email);
            customToast.success("Reset link sent to your email");
            handleDialogType("login", "remove");
            handleDialogType("forgotPassword", "remove");
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
            // if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            //   await logTrackInRewardful(user.email as string);
            // }

            customToast.success("Logged in");
            handleDialogType("login", "remove");
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };

    const logout = async () => {
        if (!auth.currentUser) {
            customToast.error("Not logged in");
            handleDialogType("login", "add");
            return;
        }
        try {
            await signOut(auth);
            customToast.success("Logged out");
            // router.push("/");
            handleDialogType("login", "add")
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };

    const resendVerificationEmail = async () => {
        if (!auth.currentUser) {
            customToast.error("Not logged in");
            handleDialogType("login", "add");
            return;
        }
        try {
            await sendEmailVerification(auth.currentUser);
            customToast.success("Verification email sent");
        } catch (error: unknown) {
            const errorMessage = handleAuthError(error);
            customToast.error(errorMessage);
        }
    };


    return {
        createAccount,
        login,
        resendVerificationEmail,
        sendPasswordResetLink,
        loginWithGoogle,
        logout,
    };
};

export default useAuth;