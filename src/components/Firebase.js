import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = "Your config..."

firebase.initializeApp(firebaseConfig);

export default firebase;
