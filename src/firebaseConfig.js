
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCXizb4GCUXT7Z0QSDjDZjMqKmN-KbbXXY",
    authDomain: "lista-de-tarefas-55010.firebaseapp.com",
    projectId: "lista-de-tarefas-55010",
    storageBucket: "lista-de-tarefas-55010.appspot.com",
    messagingSenderId: "220619560600",
    appId: "1:220619560600:web:dee0faa7b918dac0eaa2ed",
    measurementId: "G-5JTKEQ56GE"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };