import { auth } from './firebase.js';
import { signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { displayProcessDialog, hideProcessDialog } from '../utils/process-dialog.js';
import { toastMessage } from '../utils/toast-message.js';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('#login-button');

onAuthStateChanged(auth, (user) => {
  user ? window.location.href = './panel.html' : null;
});

button.addEventListener('click', async (event) => {
  event.preventDefault();
  signIn();
});

password.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "enter") {
    signIn();
  }
});

email.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "enter") {
    signIn();
  }
});

async function signIn() {
  displayProcessDialog("Logging in...");
  button.style.pointerEvents = 'none';
  password.style.pointerEvents = 'none';
  email.style.pointerEvents = 'none';
  password.blur();
  email.blur();
  await signInWithEmailAndPassword(auth, email.value, password.value)
  .catch(() => {
    hideProcessDialog();
      button.style.pointerEvents = 'all';
      password.style.pointerEvents = 'all';
      email.style.pointerEvents = 'all';
    toastMessage("Incorrect email or password.");
  });
}