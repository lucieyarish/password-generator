import { letters } from './sourceCharacters.js';
import { symbols } from './sourceCharacters.js';
import { numbers } from './sourceCharacters.js';

document
  .querySelector('#generate-passwords')
  .addEventListener('click', generatePasswords);

document
  .querySelector('#copy-btn-1')
  .addEventListener('click', copyToClipboard);

document
  .querySelector('#copy-btn-2')
  .addEventListener('click', copyPass2ToClipboard);

document.querySelector('#theme-btn').addEventListener('click', toggleMode);

const generatedPasswordEl1 = document.getElementById('generated-password-el-1');
const generatedPasswordEl2 = document.getElementById('generated-password-el-2');
const userInputEl = document.getElementById('user-password-length');
const errorMsgEl = document.getElementById('error-msg');
const generateBtnEl = document.getElementById('#generate-passwords');
let includeSymbolsEl = document.querySelector('#include-symbols');
let includeNumbersEl = document.querySelector('#include-numbers');
let symbolsIncluded = false;
let numbersIncluded = false;
let userInput = 0;

userInputEl.addEventListener('input', () => {
  userInput = userInputEl.value;
});

function generatePasswords() {
  resetPreviousPasswords();
  let isPasswordLengthValid = validateInput();
  console.log(userInput);

  if (!isPasswordLengthValid) {
    return;
  }

  if (!symbolsIncluded && !numbersIncluded && userInput === 0) {
    composePasswords(letters);
  } else if (symbolsIncluded && !numbersIncluded) {
    composePasswords(letters.concat(symbols));
  } else if (!symbolsIncluded && numbersIncluded) {
    composePasswords(letters.concat(numbers));
  } else {
    composePasswords(letters.concat(symbols).concat(numbers));
  }
}

function composePasswords(charArr) {
  if (userInput !== 0) {
    for (let i = 0; i < userInput; i++) {
      generatedPasswordEl1.textContent += getPassword(charArr);
      generatedPasswordEl2.textContent += getPassword(charArr);
    }
  } else {
    for (let i = 0; i < 15; i++) {
      userInputEl.value = '';
      generatedPasswordEl1.textContent += getPassword(charArr);
      generatedPasswordEl2.textContent += getPassword(charArr);
    }
  }
}

function getPassword(charArr) {
  let randomIndex = Math.floor(Math.random() * charArr.length);
  return charArr[randomIndex];
}

function resetPreviousPasswords() {
  generatedPasswordEl1.textContent = '';
  generatedPasswordEl2.textContent = '';
}

function validateInput() {
  if (userInput !== 0 && userInput !== undefined && userInput > 20) {
    errorMsgEl.innerHTML =
      '<i class="fa fa-exclamation-circle"></i> Required maximum password length is 20.';
    errorMsgEl.className = 'apply-background';
    userInputEl.className = 'length-settings-error';
    return false;
  } else if (userInput !== 0 && userInput !== undefined && userInput < 8) {
    errorMsgEl.innerHTML =
      '<i class="fa fa-exclamation-circle"></i> Required minimum password length is 8.';
    errorMsgEl.className = 'apply-background';
    userInputEl.className = 'length-settings-error';
    return false;
  } else {
    errorMsgEl.textContent = '';
    errorMsgEl.className = '';
    userInputEl.className = '';
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
  }, 3000);
}

function includeSymbols() {
  includeSymbolsEl.addEventListener('change', function () {
    if (includeSymbolsEl.checked) {
      symbolsIncluded = true;
    } else {
      symbolsIncluded = false;
    }
  });
}

function includeNumbers() {
  includeNumbersEl.addEventListener('change', function () {
    if (includeNumbersEl.checked) {
      numbersIncluded = true;
    } else {
      numbersIncluded = false;
    }
  });
}

includeSymbols();
includeNumbers();

userInputEl.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    generatePasswords();
  }
});

userInputEl.addEventListener('input', function (event) {
  errorMsgEl.innerHTML = '';
  errorMsgEl.className = '';
  userInputEl.className = '';
});

function toggleMode() {
  document.getElementById('theme-btn').innerHTML =
    '<i class="fa fa-moon-o"></i>';
  document.getElementById('main-container').classList.toggle('light');
  document.getElementById('title-start').classList.toggle('title-dark');
  document.getElementById('subtitle').classList.toggle('grey-text');
  document.getElementById('generate-container').classList.toggle('grey-text');
  document.getElementById('toggle-symbols').classList.toggle('toggle-dark');
  document.getElementById('toggle-numbers').classList.toggle('toggle-dark');
}
