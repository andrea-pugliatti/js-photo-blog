/**
 * **buildElement**
 * Receives the tagName of the element to create,
 * the className to attach to the element and text
 * that is treated as textContent for every tag except
 * for img tags: in this case it's an url
 * @param {string} tagName
 * @param {string} className
 * @param {string} text
 * @returns {HTMLElement}
 */
const buildElement = (tagName, className, text) => {
	const element = document.createElement(tagName);
	element.className += className;
	if (tagName === "img") {
		element.src = text;
	} else if (text) {
		element.textContent = text;
	}
	return element;
};

const toggleOverlay = () => {
	const overlayElement = document.getElementById("overlay");
	overlayElement.classList.toggle("d-none");
};

/**
 * **showCard**
 * Receives an element and a card object. It builds
 * the card and appends it to the element.
 * @param {HTMLElement} element
 * @param {object} card
 */
const showCard = (element, card) => {
	const { _, title, date, url } = card;

	const buttonElement = buildElement("button", "card-button");
	buttonElement.addEventListener("click", toggleOverlay);

	const cardElement = buildElement("div", "card");

	const pinElement = buildElement("div", "pin");
	const pinImage = buildElement("img", "", "./assets/img/pin.svg");
	pinElement.appendChild(pinImage);
	cardElement.appendChild(pinElement);

	const imageContainerElement = buildElement("div", "image-container");
	const imageElement = buildElement("img", "", url);
	imageContainerElement.appendChild(imageElement);
	cardElement.appendChild(imageContainerElement);

	const cardFooterElement = buildElement("div", "card-footer");
	// const idElement = buildElement("div", "card-id", id);
	// cardFooterElement.appendChild(idElement);
	const dateElement = buildElement("div", "card-date", date);
	cardFooterElement.appendChild(dateElement);
	const titleElement = buildElement("div", "card-title", title);
	cardFooterElement.appendChild(titleElement);
	cardElement.appendChild(cardFooterElement);

	buttonElement.appendChild(cardElement);
	element.appendChild(buttonElement);
	//element.appendChild(cardElement);
};

/**
 * **fetchCards**
 * Receives an endpoint URL and an element to append
 * the cards fetched from the endpoint.
 * @param {string} endpoint
 * @param {HTMLElement} element
 */
/*
const fetchCardsOld = (endpoint, element) => {
	fetch(endpoint)
		.then((response) => response.json())
		.then((result) => {
			result.forEach((card) => {
				showCard(element, card);
			});
		})
		.catch((error) => console.error(error));
};
*/

/**
 * **fetchCards**
 * Receives an endpoint URL and an element to append
 * the cards fetched from the endpoint.
 * This version uses async/await
 * @param {string} endpoint
 * @param {HTMLElement} element
 */
const fetchCards = async (endpoint, element) => {
	const response = await fetch(endpoint);
	const cards = await response.json();
	cards.forEach((card) => {
		showCard(element, card);
	});
};

// URL Endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Select row element
const boardElement = document.getElementById("board");

const closeOverlayElement = document.querySelector("button.close-modal");
closeOverlayElement.addEventListener("click", toggleOverlay);

// Fetch Cards and print them
fetchCards(endpoint, boardElement);
