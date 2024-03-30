import { auth } from './firebase/firebase.js';
import { db } from './firebase/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { createToggle } from './create-toggle.js';

const container = document.querySelector('#toggle-container');

onAuthStateChanged(auth, (user) => {
  user ? null : window.location.href = './index.html';
});

async function displayToggles() {
  const dataRef = ref(db, "/loads");
  const data = await get(dataRef);
  const loads = await data.val();
  loads.forEach(async (load, index) => {
    const toggle = await createToggle(`/${index}`, load);
    container.append(toggle);
  });
}
displayToggles();