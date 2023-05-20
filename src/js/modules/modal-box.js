const popupLinks = document.querySelectorAll(".popup-link");
const modalOverlays = document.querySelectorAll(".modal-overlay");
const forms = document.forms;
const KEYCODE = {
	ESC: "Escape"
};
let modalOverlay;
let modalContent;
let gratitude;
let openButton;

popupLinks.forEach((popupLink) => popupLink.addEventListener("click", openModal));

for (let form of forms) {
	form.addEventListener("submitSuccess", submitHandler);
}
for (let overlay of modalOverlays) {
	overlay.addEventListener("click", emptyPlaceCloseHandler);
}

function defineModal(event) {
	if (event.target.tagName == "FORM") {
		openButton = event.target.querySelector("button");
	} else {
		openButton = event.target.closest("button");
	}

	modalOverlay = document.querySelector(openButton.getAttribute("href"));
	modalContent = modalOverlay.querySelector(".modal-content");
	gratitude = modalOverlay.querySelector(".gratitude");
	const closeButton = modalOverlay.querySelector(".modal-close-button");
	closeButton.addEventListener("click", closeModal);
}

function openModal(event) {
	defineModal(event);
	openOverlay();
	modalContent.classList.add("open");
}

function openOverlay() {
	modalOverlay.classList.add("open");
	disablePageScroll();
	document.addEventListener("keydown", keyDownHandler);
}

function openGratitude(gratitude) {
	if(gratitude) {
		gratitude.classList.add("open");
	}
}

function closeGratitude(gratitude) {
	if(gratitude) {
		gratitude.classList.remove("open");
	}
}

function emptyPlaceCloseHandler(event) {
	if (event.target === modalOverlay) {
		closeModal();
	}
}

function keyDownHandler(event) {
	if (event.code === KEYCODE.ESC) {
		closeModal();
	}
}

function submitHandler(event) {
	if (!modalOverlay) {
		defineModal(event);
	}
	if (modalContent.classList.contains("open")) {
		modalContent.classList.remove("open");
	}

	if (!modalOverlay.classList.contains("open")) {
		openOverlay();
	}
	openGratitude(gratitude);
	document.addEventListener("keydown", keyDownHandler);
}

function closeModal() {
	modalOverlay.classList.remove("open");
	document.removeEventListener("keydown", keyDownHandler);
	modalOverlay.addEventListener("transitionend", enablePageScroll, { once: true });
	modalContent.classList.remove("open");
	closeGratitude(gratitude);
}

function disablePageScroll() {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

	document.body.classList.add("stopPageScroll");
	document.body.style.paddingRight = scrollBarWidth + "px";
}

function enablePageScroll() {
	document.body.classList.remove("stopPageScroll");
	document.body.style.paddingRight = "";
}