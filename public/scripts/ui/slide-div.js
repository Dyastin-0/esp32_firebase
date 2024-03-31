export function slideOnClick(button, closeButton, overlay, div) {
  var topValues = ["50%", "-25%", "50%", "125%"];
  var currentIndex = 1;

  button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % topValues.length;
    div.style.left = topValues[currentIndex];
    overlay.classList.add('active');
    div.classList.add('active');
  });
  closeButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % topValues.length;
    div.style.left = topValues[currentIndex];
    overlay.classList.remove('active');
    div.classList.remove('active');
  });
  overlay.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % topValues.length;
    div.style.left = topValues[currentIndex];
    overlay.classList.remove('active');
    div.classList.remove('active');
  });
}