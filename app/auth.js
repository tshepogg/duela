import { firebaseConfig } from '../firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,
         createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from
         "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { isAdmin } from './db.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const watchAuth = (cb) => onAuthStateChanged(auth, cb);
export const login = (e,p) => signInWithEmailAndPassword(auth,e,p);
export const signup = (e,p) => createUserWithEmailAndPassword(auth,e,p);
export const resetPw = (e) => sendPasswordResetEmail(auth,e);
export const logout = () => signOut(auth);

export async function toggleAdminLink(uid){
  const link = document.getElementById('adminLink');
  link.hidden = !(await isAdmin(uid));
}
