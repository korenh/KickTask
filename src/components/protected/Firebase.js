import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  "use your own config"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
