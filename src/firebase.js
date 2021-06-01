import  firebase from 'firebase'
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB-fBllmIxKLke0CxRmEncRrfkAm2eNkzQ",
    authDomain: "ecommerce-a4fb9.firebaseapp.com",
    projectId: "ecommerce-a4fb9",
    storageBucket: "ecommerce-a4fb9.appspot.com",
    messagingSenderId: "327109944187",
    appId: "1:327109944187:web:a0fce456bd623f7cd4d3de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  // export 

  export const auth = firebase.auth();

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();