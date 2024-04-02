import { createMessage } from '../message/create-message.js';
import { db } from './firebase.js';
import { ref, set, onValue, push, get, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

export async function getData(dataPath) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const data = await snapShot.val();
  return data;
}

export async function setData(dataPath, data) {
  const dataRef = ref(db, dataPath);
  await set(dataRef, data)
  .catch((error) => {
    console.error(error);
  });
}

export async function pushData(dataPath, data) {
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
  const limitRef = query(dataRef, limitToLast(10));
  onValue(limitRef, async (snapShot) => {
    createMessage(snapShot.val(), container);
  });
}

export async function pushInArray(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const messages = await snapShot.val() || [];
  messages.push(data);
  set(dataRef, messages);
}

export async function arrayIncludes(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const loads = await snapShot.val() || [];
  return loads.includes(data);
}