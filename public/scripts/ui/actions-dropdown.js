const actionsDropDown = document.querySelector('#actions-drop-down-menu');
const actionsDropDownButton = document.querySelector('#actions-drop-down-button');

const chevron = document.querySelector('#actions-chevron');

actionsDropDownButton.addEventListener('click', () => {
  if (!isOpen) {
    chevron.style.transform = 'rotate(180deg)';
    displayDropDown(actionsDropDown);
    isOpen = true;
    addGlobalClick();
  } else {
    chevron.style.transform = 'rotateY(360deg)';
    hideDropDown(actionsDropDown);
    isOpen = false;
    document.removeEventListener('click', handleGlobalClick);
  }
});

let isOpen = false;
function handleGlobalClick(e) {
  const isClicked = actionsDropDownButton.contains(e.target);
  if (!isClicked) {
    chevron.style.transform = 'rotateY(360deg)';
    hideDropDown(actionsDropDown);
    isOpen = false;
    document.removeEventListener('click', handleGlobalClick);
  }
}

function addGlobalClick() {
  document.addEventListener('click', handleGlobalClick);
}

function displayDropDown(container) {
  container.style.transform = "translateY(0) scaleY(1)";
  container.style.opacity = "1";
}

function hideDropDown(container) {
  container.style.transform = "translateY(-50%) scaleY(0)";
  container.style.opacity = "0";
}