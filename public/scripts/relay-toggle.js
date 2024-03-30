import { auth } from './firebase/firebase.js';
import { db } from './firebase/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { createToggle } from './create-toggle.js';

const container = document.querySelector('#toggle-container');

onAuthStateChanged(auth, (user) => {
  user ? null : window.location.href = './index.html';  
});


function listenToChanges() {
  const dataRef = ref(db, "/loads");
  onValue(dataRef, (snapShot) => {
    container.innerHTML = "";
    snapShot.val().forEach(async (data, index) => {
      const toggle = await createToggle(`/${index}`, data);
      container.append(toggle);
    });
  });
}

listenToChanges();