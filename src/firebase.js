import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDweNL4NQAUfR5-9P-5dkV5-2d6j2QfvCM",
  authDomain: "todolist-test-task.firebaseapp.com",
  projectId: "todolist-test-task",
  storageBucket: "todolist-test-task.appspot.com",
  messagingSenderId: "376597323610",
  appId: "1:376597323610:web:94f44cacafecdda5935d63",
};

const app = initializeApp(firebaseConfig);
const store = getFirestore(app);
const storage = getStorage();

export { store, storage };
