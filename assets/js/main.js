const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Select row
const boardElement = document.getElementById("board");

// Show Card
const showCard = (element, card) => {
	const { id, title, date, url } = card;

	const cardElement = document.createElement("div");
	cardElement.className += "card";

	const pinElement = document.createElement("div");
	pinElement.className += "pin";
	const pinImage = document.createElement("img");
	pinImage.src = "./assets/img/pin.svg";
	pinElement.appendChild(pinImage);
	cardElement.appendChild(pinElement);

	const imageContainerElement = document.createElement("div");
	imageContainerElement.className += "image-container";
	const imageElement = document.createElement("img");
	imageElement.src = url;
	imageContainerElement.appendChild(imageElement);
	cardElement.appendChild(imageContainerElement);

	const cardFooterElement = document.createElement("div");
	cardFooterElement.className += "card-footer";
	// const idElement = document.createElement("div");
	// idElement.className += "card-id";
	// idElement.textContent = id;
	// cardFooterElement.appendChild(idElement);
	const dateElement = document.createElement("div");
	dateElement.className += "card-date";
	dateElement.textContent = date;
	cardFooterElement.appendChild(dateElement);
	const titleElement = document.createElement("div");
	titleElement.className += "card-title";
	titleElement.textContent = title;
	cardFooterElement.appendChild(titleElement);
	cardElement.appendChild(cardFooterElement);

	element.appendChild(cardElement);
};

/*
//Without async/await
const fetchCards = (endpoint) => {
	fetch(endpoint)
		.then((response) => response.json())
		.then((result) => {
			result.forEach((card) => {
				console.log(card);
				showCard(boardElement, card);
			});
		})
		.catch((error) => console.error(error));
};

*/
// With async/await
const fetchCards = async (endpoint) => {
	const response = await fetch(endpoint);
	const cards = await response.json();
	cards.forEach((card) => {
		console.log(card);
		showCard(boardElement, card);
	});
};

fetchCards(endpoint);
