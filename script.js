const generateButton = document.getElementById("button");
const displayField = document.getElementById("display-field");

displayField.setAttribute("disabled", "");
const length = 12;

const upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChar = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "!@#$%^&*()";

const allChar = upperChar + lowerChar + number + symbol;

generateButton.addEventListener("click", () => {
  let password = "";
  password += upperChar[Math.floor(Math.random() * upperChar.length)];
  password += lowerChar[Math.floor(Math.random() * lowerChar.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChar[Math.floor(Math.random() * allChar.length)];
  }
  displayField.value = password;
});
