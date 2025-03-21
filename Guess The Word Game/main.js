let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("nav").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Eman Safa`;

let numberOftries = 5;
let numberOfletters = 6;
let currentTry = 1;

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOftries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i} </span>`;
    inputsContainer.appendChild(tryDiv);

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numberOfletters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("maxlength", "1");
      input.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(input);
    }
  }

  inputsContainer.children[0].children[1].focus();

  const inputInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      handleBackSpace(event);
    });
  });
}

let WordToGuess = "";
const words = ["planet", "socket", "golden", "flight", "cactus", "silver", "tunnel", "purple", "gentle", "rescue"];
WordToGuess = words[Math.floor(words.length * Math.random())].toLowerCase();

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(WordToGuess);

let messageArea = document.querySelector(".message");

function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numberOfletters; i++) {
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let letter = inputField.value.toLowerCase();
    const actualLetter = WordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (WordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    messageArea.innerHTML = `You Win! 🎉 The Word Is <span>${WordToGuess}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congrats! You Didn't Use Hints!</p>`;
    }
    document.querySelectorAll(".inputs > div").forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    document.querySelectorAll(`.try-${currentTry} input`).forEach((input) => (input.disabled = true));

    currentTry++;

    let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    if (nextTryInputs.length > 0) {
      nextTryInputs.forEach((input) => (input.disabled = false));
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      nextTryInputs[0].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose 😢 The Word Was <span>${WordToGuess}</span>`;
    }
  }
}

let numberOfHints = 2;
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(document.querySelectorAll("input")).indexOf(randomInput) % numberOfletters;

    if (indexToFill !== -1) {
      randomInput.value = WordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = Array.from(document.querySelectorAll("input:not([disabled])"));
    const currentIndex = inputs.indexOf(document.activeElement);

    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];

      if (currentInput.value === "") {
        prevInput.value = "";
        prevInput.focus();
      } else {
        currentInput.value = "";
      }
    }
  }
}

window.onload = function () {
  generateInput();
};
