import elements from "./mock-data.js"

let currLanguage = 'en';
const target = document.getElementById("app");
const nameDisplay = document.getElementById("display");
const langButton = document.getElementById("toggleLang");
const skip = document.getElementById("skip");
const availableElements = elements.slice();
const right_answers = getElementById("right-answers"); 

let currentElement = generateRandomElement();
let count_right_answers = 0;
let count_wrong_answers = 0;

function generateRandomElement() {
  if(availableElements.length === 0){
    nameDisplay.textContent = "¡Felicidades completaste el juego!";
  }
  else {
    const randomIndex = Math.floor(Math.random() * availableElements.length);
    nameDisplay.textContent = availableElements[randomIndex].name[currLanguage];

    return availableElements[randomIndex];
  }
}

function answers(event) {
  const el = event.currentTarget;
  const clickedElement = Number(el.dataset.element);
  if(currentElement.atomicNumber === clickedElement){
    count_right_answers += 1;
  }

  else {
    count_wrong_answers += 1;
  }
}

function handleElementClick(event) {
  const el = event.currentTarget;
  const clickedElement = Number(el.dataset.element);
  if(currentElement.atomicNumber === clickedElement){
    const index = availableElements.findIndex((elem) => elem.atomicNumber === currentElement.atomicNumber);
    availableElements.splice(index, 1);

    createSymbolElement(el, currentElement)
    currentElement = generateRandomElement();
    el.removeEventListener("click", handleElementClick);
  }
  else {
    el.classList.add("shake-x");
    setTimeout(() => {
      el.classList.remove("shake-x");
    }, 500);
  }
}

function createRow() {
  const row = document.createElement("DIV");
  row.classList.add("row");

  return row;
}

function createRowNumber(num) {
  const rowNumber = document.createElement("DIV");
  rowNumber.classList.add("element", "row-number");
  rowNumber.textContent = num;

  return rowNumber;
}

function createSpecialCell(str) {
  const specialCell = document.createElement("DIV");
  specialCell.classList.add("element", "special-cell");
  specialCell.textContent = str;

  return specialCell;
}

function createElement(element) {
  const elem = document.createElement("DIV");
  elem.classList.add('element');

  elem.innerHTML += `<span class="atomic-number">${element.atomicNumber}</span>`;
  elem.dataset.element = element.atomicNumber;
  elem.addEventListener("click", handleElementClick);

  if(element.atomicNumber === 1 || element.atomicNumber === 4 || element.atomicNumber === 12) {
    elem.classList.add("special-element")
  }

  return elem;
}

function createSymbolElement(eventTarget, element) {
  const symbolElement = document.createElement("span");
  symbolElement.textContent = element.symbol;
  eventTarget.style.backgroundColor = element.color;
  eventTarget.style.cursor = "auto";
  eventTarget.appendChild(symbolElement)
}

function placeElements(elements) {
  // First Row
  const firstRow = createRow();
  const firstRowNumber = createRowNumber(1);
  firstRow.appendChild(firstRowNumber);

  for(let i=0; i < 2 ; i++) {
    const elem = createElement(elements[i]);
    firstRow.appendChild(elem);
  }

  target.appendChild(firstRow)

  // Second Row
  const secondRow = createRow();
  const secondRowNumber = createRowNumber(2);
  secondRow.appendChild(secondRowNumber);

  for(let i=2; i < 10; i++) {
    const elem = createElement(elements[i]);
    secondRow.appendChild(elem);
  }

  target.appendChild(secondRow)

  // Third Row
  const thirdRow = createRow();
  const thirdRowNumber = createRowNumber(3);
  thirdRow.appendChild(thirdRowNumber);

  for(let i=10; i < 18; i++) {
    const elem = createElement(elements[i]);
    thirdRow.appendChild(elem);
  }

  target.appendChild(thirdRow)

  // Fourth Row
  const fourthRow = createRow();
  const fourthRowNumber = createRowNumber(4);
  fourthRow.appendChild(fourthRowNumber);

  for(let i=18; i < 36; i++) {
    const elem = createElement(elements[i]);
    fourthRow.appendChild(elem);
  }

  target.appendChild(fourthRow)

  // Fifth Row
  const fifthRow = createRow();
  const fifthRowNumber = createRowNumber(5);
  fifthRow.appendChild(fifthRowNumber);

  for(let i=36; i < 54; i++) {
    const elem = createElement(elements[i]);
    fifthRow.appendChild(elem);
  }

  target.appendChild(fifthRow)

  // Sixth Row
  const sixthRow = createRow();
  const sixthRowNumber = createRowNumber(6);
  sixthRow.appendChild(sixthRowNumber);

  // Row corresponding to 57/71 elements
  const sixthRowEspecial = createRow();
  const sixthRowNumberEspecial = createRowNumber(6);
  sixthRowEspecial.appendChild(sixthRowNumberEspecial);

  // Special Cell 57/71
  const firstSpecialCell = createSpecialCell("57/71");

  for(let i=54; i < 86; i++) {
    const elem = createElement(elements[i]);

    if( i === 56 ) {
      sixthRow.appendChild(firstSpecialCell);
    }

    if( 56 <= i && i < 71 ) {
      sixthRowEspecial.appendChild(elem);
    }
    else {
      sixthRow.appendChild(elem);
    }
  }

  target.appendChild(sixthRow)

  // Seventh Row
  const seventhRow = createRow();
  const seventhRowNumber = createRowNumber(7);
  seventhRow.appendChild(seventhRowNumber);

  // Row corresponding to 89/103 elements
  const seventhRowEspecial = createRow();
  const seventhRowNumberEspecial = createRowNumber(7);
  seventhRowEspecial.appendChild(seventhRowNumberEspecial);

  // Special Cell 89/103
  const secondSpecialCell = createSpecialCell("89/103");

  for(let i=86; i < 118; i++) {
    const elem = createElement(elements[i]);

    if( i === 88 ) {
      seventhRow.appendChild(secondSpecialCell);
    }

    if( 88 <= i && i < 103 ) {
      seventhRowEspecial.appendChild(elem);
    }
    else {
      seventhRow.appendChild(elem);
    }
  }

  target.appendChild(seventhRow)

  sixthRowEspecial.classList.add("special-row");
  seventhRowEspecial.classList.add("special-row");
  target.appendChild(sixthRowEspecial);
  target.appendChild(seventhRowEspecial);

}

function skipButton(){
  const button = document.createElement('BUTTON');
  button.classList.add('skipButton');
  button.textContent = 'Skip';
  skip.appendChild(button)
  button.addEventListener('click', handleSkip)
}

function handleSkip(){
  currentElement = generateRandomElement();
}

function ToggleLangButton(){
  langButton.addEventListener("click", handleToggleLang)
}

function handleToggleLang(){
  if (currLanguage === 'es'){
    currLanguage = 'en';
  }
  else if (currLanguage === 'en'){
    currLanguage = 'es';
  }
  langButton.classList.toggle('active');
  handleSkip()
}

function main() {

  placeElements(elements);
  skipButton()
  ToggleLangButton()
}

main();