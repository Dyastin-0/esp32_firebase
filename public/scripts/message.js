import { pushInArray } from "./firebase/database-api.js";
import { listenToChangesOnSnap } from "./firebase/database-api.js";

const message = document.querySelector('#message-input-field');
const messageContainer = document.querySelector('#messages');

message.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "Enter") {
    pushInArray("/messages", message.value);
    message.value = "";
  }
});

listenToChangesOnSnap("messages/", messageContainer);



