import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBQ1sLH6IFYHC2gXzCHEpaiTtLmKdqCrvM",
  authDomain: "tasking-993d0.firebaseapp.com",
  databaseURL: "https://tasking-993d0.firebaseio.com",
  projectId: "tasking-993d0",
  storageBucket: "tasking-993d0.appspot.com",
  messagingSenderId: "590535416607",
  appId: "1:590535416607:web:93ebfcdf9a2759ec5f2e2a",
  measurementId: "G-Z3T7FTG1P9",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
