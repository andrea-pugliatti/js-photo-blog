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

/**
 * **toggleOverlay**
 * Receives an Element Id.
 * Toggles the class "d-none" on the element specified
 * by the Id.
 * @param {text} id
 */
const toggleDisplayById = (id) => {
	const element = document.getElementById(id);
	element.classList.toggle("d-none");
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

	// Build the main card
	const cardElement = buildElement("button", "card");
	cardElement.addEventListener("click", () => {
		const imgElement = document.querySelector("#overlay img");
		imgElement.src = url;
		toggleDisplayById("overlay");
	});

	// Build pin and append to card
	const pinElement = buildElement("div", "pin");
	const pinImage = buildElement("img", "", "./assets/img/pin.svg");
	pinElement.appendChild(pinImage);
	cardElement.appendChild(pinElement);

	// Build image and append to card
	const imageContainerElement = buildElement("div", "image-container");
	const imageElement = buildElement("img", "", url);
	imageContainerElement.appendChild(imageElement);
	cardElement.appendChild(imageContainerElement);

	// Build footer and append to card
	const cardFooterElement = buildElement("div", "card-footer");
	const dateElement = buildElement("div", "card-date", date);
	cardFooterElement.appendChild(dateElement);
	const titleElement = buildElement("div", "card-title", title);
	cardFooterElement.appendChild(titleElement);
	cardElement.appendChild(cardFooterElement);

	// Append the main card to element
	element.appendChild(cardElement);
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

// Event listener for the close button in the overlay
const closeOverlayElement = document.querySelector("button.close-modal");
closeOverlayElement.addEventListener("click", () =>
	toggleDisplayById("overlay"),
);

// Select row element
const boardElement = document.getElementById("board");

// Fetch Cards and print them
fetchCards(endpoint, boardElement);
