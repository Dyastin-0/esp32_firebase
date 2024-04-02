import { displayConfirmDialog } from "../utils/confirm-dialog.js";
import { pushInArray, arrayIncludes, setData, getData } from "../firebase/database-api.js";
import { slideOnClick } from "../ui/slide-div.js";
import { toastMessage } from "../utils/toast-message.js";
import { currentDateTime } from "../utils/date.js";

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
    if (await arrayIncludes("/toggles/names", trimmedData)) {
      toastMessage(`Switch name '${trimmedData}' is already used.`);
      return;
    }
    const process = async () => {
      await pushInArray("/toggles/names", trimmedData);
      switchName.value = "";
      const toggleCount = await getData("/toggles/count");
      setData("/toggles/count", toggleCount + 1);
      await pushInArray("/messages", {
        sentBy: localStorage.getItem('currentUser'),
        message: `Added a toggle named ${trimmedData.toLowerCase()}.`,
        timeSent: currentDateTime()
      });
    }
    await displayConfirmDialog(process,
      `Add ${switchName.value.trim().toLowerCase()} toggle?`,
      `${trimmedData} toggle added!`);
  }
});
