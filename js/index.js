import { characters } from './sourceCharacters.js';

document
  .querySelector('#generate-passwords')
  .addEventListener('click', generatePasswords);

const generatedPasswordEl1 = document.getElementById('generated-password-el-1');
const generatedPasswordEl2 = document.getElementById('generated-password-el-2');
const userInputEl = document.getElementById('user-password-length');
const errorMsgEl = document.getElementById('error-msg');
let userInput = 0;

userInputEl.addEventListener('blur', () => {
  userInput = userInputEl.value;
  console.log(userInput);
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
      userInputEl.value = '';
    }
  } else {
    for (let i = 0; i < 15; i++) {
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
