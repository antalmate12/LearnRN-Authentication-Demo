import AuthContent from '../components/Auth/AuthContent';
import {createUser, loginUser} from "../utils/auth";
import {useContext, useState} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from "react-native";
import {AuthContext} from "../store/auth-context";

function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  async function signUpHandler({email, password}) {
    try {
      setIsAuthenticating(true);
      
       try {
        const token = await createUser(email, password);
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
    return <LoadingOverlay message={"Creating the User..."}/>
  }
  
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
