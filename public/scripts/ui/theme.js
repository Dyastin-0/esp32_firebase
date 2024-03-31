const themeToggle = document.querySelector('#theme-toggle');

const currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
  localStorage.setItem('theme', 'dark');
} else {
  if (currentTheme == 'dark') {
    themeToggle.checked = false;
    darkTheme();
  } else {
    themeToggle.checked = true;
    lightTheme();
  }
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    localStorage.setItem('theme', 'light');
    lightTheme();
  } else {
    localStorage.setItem('theme', 'dark');
    darkTheme();
  }
});

function lightTheme() {
  document.documentElement.style.setProperty('--base-color', 'rgb(220, 220, 220)');
  document.documentElement.style.setProperty('--secondary-color', 'rgb(200, 200, 200)');
  document.documentElement.style.setProperty('--text-color', 'rgb(45, 45, 45)');
  document.documentElement.style.setProperty('--complement', 'rgb(230, 230, 230)');
}

function darkTheme() {
  document.documentElement.style.setProperty('--base-color', 'rgb(35, 35, 35)');
  document.documentElement.style.setProperty('--secondary-color', 'rgb(45, 45, 45)');
  document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
  document.documentElement.style.setProperty('--complement', 'rgb(25, 25, 25)');
}