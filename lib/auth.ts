import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function loginWithEmail(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithEmail(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence);
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function logout() {
  return signOut(auth);
}
