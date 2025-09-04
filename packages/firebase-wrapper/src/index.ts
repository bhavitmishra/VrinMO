import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsd-CWYCGO0qfa933rbpb7AGMeYXqldGI",
  authDomain: "test-63b39.firebaseapp.com",
  projectId: "test-63b39",
  storageBucket: "test-63b39.firebasestorage.app",
  messagingSenderId: "652669695047",
  appId: "1:652669695047:web:e87cb1af8032f06c2e2d62",
  measurementId: "G-N1LYBVBEWY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 👇 FIX: Pass `auth` into RecaptchaVerifier
export const setupRecaptcha = (containerId: string) => {
  if (typeof window === "undefined") return; // no SSR
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible", // or "normal"
  });
};

export { app, auth };
