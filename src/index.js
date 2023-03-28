import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLdN6sXCeS_roPBcWGn3_spOMn4pXk4hw",
  authDomain: "cart-6a0e9.firebaseapp.com",
  projectId: "cart-6a0e9",
  storageBucket: "cart-6a0e9.appspot.com",
  messagingSenderId: "931278065526",
  appId: "1:931278065526:web:033b06503e10e250157457"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
