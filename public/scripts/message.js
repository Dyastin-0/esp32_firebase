import { pushDataInRealtimeDatabase } from "./database-api.js";
import { listenToChangesOnSnap } from "./database-api.js";

const message = document.querySelector('#message-input-field');
const messageContainer = document.querySelector('#messages');

message.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key == "Enter") {
    pushDataInRealtimeDatabase("messages/", {
      message: message.value
    });
    message.value = "";
  }
});

message.addEventListener('click', (event) => {
  event.preventDefault();
  message.placeholder = "Type a message";
});

message.addEventListener('mouseout', (event) => {
  event.preventDefault();
  message.placeholder = "Message";
});

listenToChangesOnSnap("messages/", messageContainer);



