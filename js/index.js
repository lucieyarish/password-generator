import { characters } from './sourceCharacters.js';

document
  .querySelector('#generate-passwords')
  .addEventListener('click', generatePasswords);

let generatedPasswordEl1 = document.getElementById('generated-password-el-1');
let generatedPasswordEl2 = document.getElementById('generated-password-el-2');

function generatePasswords() {
  resetPreviousPasswords();
  for (let i = 0; i < 15; i++) {
    generatedPasswordEl1.textContent += getRandomSymbol();
    generatedPasswordEl2.textContent += getRandomSymbol();
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
