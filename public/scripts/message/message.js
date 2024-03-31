import { pushInArray } from "../firebase/database-api.js";
import { listenToChangesOnSnap } from "../firebase/database-api.js";
import { currentDateTime } from "../utils/date.js";


const message = document.querySelector('#message-input-field');
const messageContainer = document.querySelector('#messages');

message.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "Enter") {
    pushInArray("/messages", {
      sentBy: localStorage.getItem('currentUser'), 
      message: message.value.trim(),
      timeSent: currentDateTime()
    });
    message.value = "";
  }
});

listenToChangesOnSnap("/messages", messageContainer);

