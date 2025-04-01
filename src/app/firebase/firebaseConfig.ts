import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUwOl0itAbxU0DH3f83Wwe_K6raj2j1k8",
  authDomain: "moviedekho-728ea.firebaseapp.com",
  projectId: "moviedekho-728ea",
  storageBucket: "moviedekho-728ea.appspot.com",
  messagingSenderId: "96191372793",
  appId: "1:96191372793:web:1c6562ece99237ef253128",
  measurementId: "G-MLB27NT36R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
