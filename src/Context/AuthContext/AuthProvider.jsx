import { AuthContext } from "./AuthContext";

const AuthProvider = ({children}) => {
    const userInfo = {
        name: "sami"
    }
    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;