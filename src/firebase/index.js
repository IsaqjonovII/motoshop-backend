const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyABTdEv3HWABezcLnd2sW1aa-XvlaDdKzM",
  authDomain: "motoshop-306fc.firebaseapp.com",
  projectId: "motoshop-306fc",
  storageBucket: "motoshop-306fc.appspot.com",
  messagingSenderId: "155619755376",
  appId: "1:155619755376:web:ac93e28c32123284c2fbb5",
  measurementId: "G-04T85L54W3",
};

const app = initializeApp(firebaseConfig);
module.exports = app;
