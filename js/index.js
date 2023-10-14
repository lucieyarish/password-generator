import { characters } from './sourceCharacters.js';

document
  .querySelector('#generate-passwords')
  .addEventListener('click', generatePasswords);

document
  .querySelector('#copy-btn-1')
  .addEventListener('click', copyToClipboard);

document
  .querySelector('#copy-btn-2')
  .addEventListener('click', copyPass2ToClipboard);

const generatedPasswordEl1 = document.getElementById('generated-password-el-1');
const generatedPasswordEl2 = document.getElementById('generated-password-el-2');
const userInputEl = document.getElementById('user-password-length');
const errorMsgEl = document.getElementById('error-msg');
let userInput = 0;

userInputEl.addEventListener('blur', () => {
  userInput = userInputEl.value;
});

function generatePasswords() {
  resetPreviousPasswords();
  let isPasswordLengthValid = validateInput();

  if (!isPasswordLengthValid) {
    return;
  }

  if (userInput !== 0) {
    for (let i = 0; i < userInput; i++) {
      generatedPasswordEl1.textContent += getRandomSymbol();
      generatedPasswordEl2.textContent += getRandomSymbol();
    }
    resetUserInput();
  } else {
    for (let i = 0; i < 15; i++) {
      userInputEl.value = '';
      generatedPasswordEl1.textContent += getRandomSymbol();
      generatedPasswordEl2.textContent += getRandomSymbol();
    }
  }
}

function getRandomSymbol() {
  let randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

function resetPreviousPasswords() {
  generatedPasswordEl1.textContent = '';
  generatedPasswordEl2.textContent = '';
}

function resetUserInput() {
  userInput = 0;
}

function validateInput() {
  if (userInput !== 0 && userInput > 20) {
    errorMsgEl.textContent = 'Required maximum password lenght is 20.';
    return false;
  } else if (userInput !== 0 && userInput < 8) {
    errorMsgEl.textContent = 'Required minimum password lenght is 8.';
    return false;
  } else {
    errorMsgEl.textContent = '';
    return true;
  }
}

function copyToClipboard() {
  if (
    generatedPasswordEl1.innerText !== undefined ||
    generatedPasswordEl1.innerText.length !== 0
  ) {
    copyPass1ToClipboard();
  } else if (
    generatedPasswordEl2.innerText !== undefined ||
    generatedPasswordEl2.innerText.length !== 0
  ) {
    copyPass2ToClipboard();
  } else {
    return;
  }
}

function copyPass1ToClipboard() {
  navigator.clipboard
    .writeText(generatedPasswordEl1.innerText)
    .then(() => {
      alertUser(generatedPasswordEl1.innerText);
    })
    .catch((err) => {
      console.error(`Error copying text to clipboard: ${err}`);
    });
}

function copyPass2ToClipboard() {
  navigator.clipboard
    .writeText(generatedPasswordEl2.innerText)
    .then(() => {
      alertUser(generatedPasswordEl2.innerText);
    })
    .catch((err) => {
      console.error(`Error copying text to clipboard: ${err}`);
    });
}

function alertUser(password) {
  if (password.length === 0) {
    return;
  }
  var copyMsgEl = document.getElementById('copy-msg');
  copyMsgEl.textContent = `${password} was copied to your clipboard!`;
  copyMsgEl.className = 'show';

  setTimeout(() => {
    copyMsgEl.className = copyMsgEl.className.replace('show', '');
  }, 2000);
}
