import { auth } from './firebase.js';
import { signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('#login-button');

onAuthStateChanged(auth, (user) => {
  user ? window.location.href = './panel.html' : null;
});

button.addEventListener('click', (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value);
});

password.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "enter") {
    signInWithEmailAndPassword(auth, email.value, password.value);
  }
});

email.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "enter") {
    signInWithEmailAndPassword(auth, email.value, password.value);
  }
});