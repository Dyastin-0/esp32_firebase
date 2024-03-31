import { displayConfirmDialog } from "../utils/confirm-dialog.js";
import { pushInArray, arrayIncludes } from "../firebase/database-api.js";
import { slideOnClick } from "../ui/slide-div.js";
import { toastMessage } from "../utils/toast-message.js";

const modal = document.querySelector('#add-toggle-modal');
const modalButton = document.querySelector('#add-toggle');
const switchName = document.querySelector('#switch-name');
const closeModal = document.querySelector('#close-add-toggle');

const overlay = document.querySelector('#overlay');

slideOnClick(modalButton, closeModal, overlay, modal);

switchName.addEventListener('keyup', async (e) => {
  if (!switchName.value) return;
  if (e.key == "Enter") {
    const trimmedData = switchName.value.trim();
    if (await arrayIncludes("/loads", trimmedData)) {
      toastMessage(`Switch name '${trimmedData}' is already used.`);
      return;
    }
    const process = async () => {
      await pushInArray("/loads", trimmedData);
      switchName.value = "";
    }
    await displayConfirmDialog(process,
      `Add ${switchName.value.trim()}?`,
      `${trimmedData} switch added!`);
  }
});
