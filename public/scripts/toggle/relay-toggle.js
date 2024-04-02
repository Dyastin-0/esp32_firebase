import { auth } from '../firebase/firebase.js';
import { db } from '../firebase/firebase.js';
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { createToggle } from './create-toggle.js';

const container = document.querySelector('#toggle-container');
const username = document.querySelector('#user-name');

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('currentUser', user.displayName);
    username.textContent = user.displayName;
  } else {
    window.location.href = './index.html'
  } 
});


function listenToChanges() {
  const dataRef = ref(db, "/toggles/names");
  onValue(dataRef, (snapShot) => {
    container.innerHTML = "";
    snapShot.val().forEach(async (data, index) => {
      const toggle = await createToggle(`/toggles/states/${index}`, data);
      container.append(toggle);
    });
  });
}

listenToChanges();