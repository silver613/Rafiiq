importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBJIBDBL_88rItQt1q1xBdClZOjHhbQpPc",
    authDomain: "firetest-63d6f.firebaseapp.com",
    databaseURL: "https://firetest-63d6f.firebaseio.com",
    projectId: "firetest-63d6f",
    storageBucket: "firetest-63d6f.appspot.com",
    messagingSenderId: "892842927936",
    appId: "1:892842927936:web:843297c6b969a473cd7ca5"
  });

  // firebase.initializeApp(firebaseConfig);


  const messaging = firebase.messaging();

