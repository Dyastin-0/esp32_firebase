import { setData, 
	listenToChangesOn,
	pushInArray } from "../firebase/database-api.js";
import { currentDateTime } from "../utils/date.js";

export async function createToggle(path, name) {
  const subContainer = document.createElement('div');
	const loadName = document.createElement('h4');
	const label = document.createElement('label');
	const toggle = document.createElement('input');
	const span = document.createElement('span');

	subContainer.classList.add('sub-container');
	label.classList.add('toggle');
	span.classList.add('slider');
	span.classList.add('round');
	toggle.type = 'checkbox';
	toggle.id = name;

	loadName.textContent = name;

	toggle.addEventListener('click', async (e) => {
		await setData(path, toggle.checked);
		const state = toggle.checked ? "on" : "off";
		await pushInArray("/messages", {
			sentBy: localStorage.getItem('currentUser'),
			message: `Turned ${state} the ${name.toLowerCase()}.`,
			timeSent: currentDateTime()
		});
	});

	listenToChangesOn(path, toggle);

	subContainer.append(loadName);
	label.append(toggle);
	label.append(span);
	subContainer.append(label);

	return subContainer;
}