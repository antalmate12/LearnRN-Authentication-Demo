import AuthContent from '../components/Auth/AuthContent';
import {createUser, loginUser} from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useContext, useState} from "react";
import {Alert} from "react-native";
import {AuthContext} from "../store/auth-context";

function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  async function loginHandler({email, password}) {
    try {
      setIsAuthenticating(true);
      
      try {
        const token = await loginUser(email, password);
        authCtx.authenticate(token);
      } catch (err) {
        Alert.alert(
          'Authentication failed',
          'Please check your credentials and try again.',
        )
      }
      
      setIsAuthenticating(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsAuthenticating(false);
    }
  }
  
  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging in..."}/>
  }
  
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
