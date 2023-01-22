import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs7NPUcegnS7KjoRU8HyUejvugJlh0BSs",
  authDomain: "native-project-169a5.firebaseapp.com",
  databaseURL:
    "https://native-project-169a5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "native-project-169a5",
  storageBucket: "native-project-169a5.appspot.com",
  messagingSenderId: "550359109677",
  appId: "1:550359109677:web:e65bc73b62316cac42e8a4",
};

export const appFirebase = initializeApp(firebaseConfig);
