  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCjPphsLQFY50Kf_6H0XDHENOxndkA7o2I",
    authDomain: "chat-socketi0.firebaseapp.com",
    projectId: "chat-socketi0",
    storageBucket: "chat-socketi0.appspot.com",
    messagingSenderId: "738549347929",
    appId: "1:738549347929:web:bf30de2a300b4b684ea348",
    measurementId: "G-2F29VSLXQN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
