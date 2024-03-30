import { auth } from './firebase/firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const logoutButton = document.querySelector('#log-out');

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  signOut(auth);
});