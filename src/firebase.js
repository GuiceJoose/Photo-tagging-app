import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAStQ_rs2eTlk37lR-MGPcbB_sWYKSfqiY",
  authDomain: "odin-photo-tagging-app.firebaseapp.com",
  projectId: "odin-photo-tagging-app",
  storageBucket: "odin-photo-tagging-app.appspot.com",
  messagingSenderId: "563860682745",
  appId: "1:563860682745:web:922e50c839bf39e575af28",
  measurementId: "G-4T0CCDD5MR",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
