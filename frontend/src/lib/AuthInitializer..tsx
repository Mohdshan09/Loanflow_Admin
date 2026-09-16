import { useEffect } from "react";
import { useAuthStore } from "../stores/auth.store";

const AuthInitializer = () => {
    const restoreSession = useAuthStore(
        (state) => state.restoreSession
    );

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    return null;
};

export default AuthInitializer;