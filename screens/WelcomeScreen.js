import { StyleSheet, Text, View } from 'react-native';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const [fetchedMessage, setFetchedMessage] = useState('');
  
  useEffect(() => {
    axios.get(`https://learn-react-native-udemy-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${authCtx.token}`)
    .then(response => {
      setFetchedMessage(response.data);
      console.log(response.data);
    });
  }, [authCtx.token]);
  
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
