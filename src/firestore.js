import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD9dOWrBMFnzNdHzEZpWbq7bOlQvrh7yk4",
    authDomain: "concesionaria-e1571.firebaseapp.com",
    projectId: "concesionaria-e1571",
    storageBucket: "concesionaria-e1571.appspot.com",
    messagingSenderId: "84721558785",
    appId: "1:84721558785:web:3045c70a8af514cef1a700",
    measurementId: "G-788NP311J4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase