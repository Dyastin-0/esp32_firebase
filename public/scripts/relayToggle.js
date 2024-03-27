import { auth } from './firebase.js';
import { db } from './firebase.js';
import { setDataInRealtimeDatabase, listenToChangesOn, pushDataInRealtimeDatabase } from './database-api.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { currentDateTime } from './date.js';

const firstRelay = document.querySelector('#first-relay');
const secondRelay = document.querySelector('#second-relay');
const thirdRelay = document.querySelector('#third-relay');
const fourthRelay = document.querySelector('#fourth-relay');

onAuthStateChanged(auth, (user) => {
  user ? null : window.location.href = './index.html';
});

firstRelay.addEventListener('change', async (event) => {
  event.preventDefault();
  await setSignal("/firstRelay", {
    name: "Light",
    isOn: firstRelay.checked
  });
  const dataRef = ref(db, "/firstRelay");
  const data = await get(dataRef);
  const str = data.val().isOn ? "on" : "off";
  await pushDataInRealtimeDatabase("/messages", {
    message: data.val().name + " turned " + str + " at " + currentDateTime()
  });
});

secondRelay.addEventListener('change', async (event) => {
  setSignal("/secondRelay",  {
    name: "Computer",
    isOn: secondRelay.checked
  });
  const dataRef = ref(db, "/secondRelay");
  const data = await get(dataRef);
  const str = data.val().isOn ? "on" : "off";
  await pushDataInRealtimeDatabase("/messages", {
    message: data.val().name + " turned " + str + " at " + currentDateTime()
  });
});

thirdRelay.addEventListener('change', async (event) => {
  setSignal("/thirdRelay",  {
    name: "Fan",
    isOn: thirdRelay.checked
  });
  const dataRef = ref(db, "/thirdRelay");
  const data = await get(dataRef);
  const str = data.val().isOn ? "on" : "off";
  await pushDataInRealtimeDatabase("/messages", {
    message: data.val().name + " turned " + str + " at " + currentDateTime()
  });
});

fourthRelay.addEventListener('change', async (event) => {
  await setSignal("/fourthRelay",  {
    name: "Light (1)",
    isOn: fourthRelay.checked
  });
  const dataRef = ref(db, "/fourthRelay");
  const data = await get(dataRef);
  const str = data.val().isOn ? "on" : "off";
  await pushDataInRealtimeDatabase("/messages", {
    message: data.val().name + " turned " + str + " at " + currentDateTime()
  });
});

async function setSignal(dataPath, signal) {
  await setDataInRealtimeDatabase(dataPath, signal);
}

async function listenRealTime() {
  await listenToChangesOn("/firstRelay", firstRelay);
  await listenToChangesOn("/secondRelay", secondRelay);
  await listenToChangesOn("/thirdRelay", thirdRelay);
  await listenToChangesOn("/fourthRelay", fourthRelay);
}

listenRealTime();