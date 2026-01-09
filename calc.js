let dispOperandA = 0;
let dispOperandB = 0;
let dispOperator = '';

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

function setUpButtonClicks() {
  const digitButtons = document.querySelectorAll(".digit");

  for (let i = 0; i < digitButtons.length; i++) {
    digitButtons[i].addEventListener("click", (e) => {
      const display = document.querySelector(".display");
      const digitValue = Number(digitButtons[i].textContent);
      display.textContent = digitValue;
      dispOperandA = digitValue;
    })
  }
}

setUpButtonClicks();