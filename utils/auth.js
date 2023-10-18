import axios from "axios";

const apiKey = 'AIzaSyC_4h_3iS4In0uqqVrSXmXNidUYAwt8mxw'
const baseUrl = 'https://identitytoolkit.googleapis.com/v1/';

/**
 * Authenticate user
 * @param {'signUp' | 'signInWithPassword'} mode
 * @param {string} email
 * @param {string} password
 */
export async function authenticate(mode, email, password) {
  const url = `${baseUrl}accounts:${mode}?key=${apiKey}`;
  
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true
  });
  
  const token = res.data?.idToken;
  
  console.log(res.data);
  
  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function loginUser(email, password) {
  return authenticate('signInWithPassword', email, password);
}
