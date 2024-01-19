import { useContext } from "react"
import { AuthContext } from '../AuthManager'

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error( "AuthContext has to be used within <CurrentUserContext.Provider>");
    }

    return authContext;
};
 