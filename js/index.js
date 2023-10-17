import { letters } from './sourceCharacters.js';
import { symbols } from './sourceCharacters.js';
import { numbers } from './sourceCharacters.js';

document
  .querySelector('#generate-passwords')
  .addEventListener('click', generatePasswords);

const generatedPasswordEl1 = document.getElementById('generated-password-el-1');
const generatedPasswordEl2 = document.getElementById('generated-password-el-2');
const userInputEl = document.getElementById('user-password-length');
const errorMsgEl = document.getElementById('error-msg');
const copyBtnEl1 = document.getElementById('copy-btn-1');
const copyBtnEl2 = document.getElementById('copy-btn-2');
const themeBtnEl = document.querySelector('#theme-btn');
const includeSymbolsEl = document.querySelector('#include-symbols');
const includeNumbersEl = document.querySelector('#include-numbers');
let symbolsIncluded = false;
let numbersIncluded = false;
let userInput = 0;

userInputEl.addEventListener('input', () => {
  userInput = userInputEl.value;
});

function generatePasswords() {
  resetPreviousPasswords();
  let isPasswordLengthValid = validateInput();

  if (!isPasswordLengthValid) {
    return;
  }

  if (!symbolsIncluded && !numbersIncluded) {
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
  if (
    userInput !== 0 &&
    userInput !== undefined &&
    userInput !== '' &&
    userInput > 20
  ) {
    errorMsgEl.innerHTML =
      '<i class="fa fa-exclamation-circle"></i> Required maximum password length is 20.';
    errorMsgEl.className = 'apply-background';
    userInputEl.className = 'length-settings-error';
    return false;
  } else if (
    userInput !== 0 &&
    userInput !== undefined &&
    userInput !== '' &&
    userInput < 8
  ) {
    errorMsgEl.innerHTML =
      '<i class="fa fa-exclamation-circle"></i> Required minimum password length is 8.';
    errorMsgEl.className = 'apply-background';
    userInputEl.className = 'length-settings-error';
    return false;
  } else {
    errorMsgEl.textContent = '';
    errorMsgEl.className = '';
    userInputEl.className = '';
    userInput = 0;
    return true;
  }
}

copyBtnEl1.addEventListener('click', function (event) {
  copyPass1ToClipboard();
});

copyBtnEl2.addEventListener('click', function (event) {
  copyPass2ToClipboard();
});

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
  console.log(password);
  if (password.length === 0) {
    return;
  }
  var copyMsgEl = document.getElementById('copy-msg');
  copyMsgEl.textContent = `Password: "${password}" was copied to your clipboard!`;
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

themeBtnEl.addEventListener('click', function () {
  const icon = this.querySelector('i');

  if (icon.classList.contains('fa-sun-o')) {
    icon.classList.remove('fa-sun-o');
    icon.classList.add('fa-moon-o');
    icon.classList.add('icon-dark');
  } else {
    icon.classList.remove('fa-moon-o');
    icon.classList.remove('icon-dark');
    icon.classList.add('fa-sun-o');
  }

  document.getElementById('main-container').classList.toggle('light');
  document.getElementById('title-start').classList.toggle('title-dark');
  document.getElementById('subtitle').classList.toggle('grey-text');
  document.getElementById('generate-container').classList.toggle('grey-text');
  document.getElementById('toggle-symbols').classList.toggle('toggle-dark');
  document.getElementById('toggle-numbers').classList.toggle('toggle-dark');
});
