export function createMessage(data, container) {
  container.innerHTML = "";
  data.forEach((element) => {
    const data = element.message;
    const sentBy = element.sentBy;
    const timeSent = element.timeSent;

    const currentUser = localStorage.getItem('currentUser');
    const childMessage = document.createElement('label');
    const user = document.createElement('p');

    childMessage.classList.add('message');
    user.classList.add('sent-by');

    if (sentBy && (sentBy == currentUser)) {
      childMessage.classList.add('right');
      user.classList.add('right');
      user.textContent = `On ${timeSent} You`;
      childMessage.textContent = `${data}`;
    } else {
      childMessage.textContent = `${data}`;
      user.textContent = `${sentBy} on ${timeSent}`;
    }
    container.append(user);
    container.append(childMessage);
    container.scrollTop = container.scrollHeight;
  });
}