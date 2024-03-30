import { db } from './firebase.js';
import { ref, set, onValue, push, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

export async function setDataInRealtimeDatabase(dataPath, data) {
  const dataRef = ref(db, dataPath);
  await set(dataRef, data)
  .catch((error) => {
    console.error(error);
  });
}

export async function pushDataInRealtimeDatabase(dataPath, data) {
  if (!data) return;
  const dataRef = ref(db, dataPath);
  await push(dataRef, data)
  .catch((error) => {
    console.error(error);
  });
}

export async function listenToChangesOn(dataPath, element) {
  const dataRef = ref(db, dataPath);
  await onValue(dataRef, (snapShot) => {
    element.checked = snapShot.val();
  });
}

export async function listenToChangesOnSnap(dataPath, container) {
  const dataRef = ref(db, dataPath);
  await onValue(dataRef, (snapShot) => {
    container.innerHTML = "";
    snapShot.forEach((element) => {
      const data = element.val();
      const childMessage = document.createElement('label');
      childMessage.classList.add('message');
      childMessage.textContent = data;
      container.insertBefore(childMessage, container.firstChild);
    });
  });
}

export async function pushInArray(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const messages = await snapShot.val() || [];
  messages.push(data);
  set(dataRef, messages);
}

export async function pushInArrayWithCheck(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const messages = await snapShot.val() || [];
  if (messages.includes(data)) {
    return;
  } else {
    messages.push(data);
    set(dataRef, messages);
  }
}