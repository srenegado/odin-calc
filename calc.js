let dispOperandA = '';
let dispOperandB = '';
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
    case '×':
      return multiply(a, b);
    case '/':
    case '÷':
      return divide(a, b);
  }
}

function setUpButtonClicks() {
  const digitButtons = document.querySelectorAll(".digit");
  const opButtons = document.querySelectorAll(".op");
  const equalsButton = document.querySelector(".equals");
  const clearButton = document.querySelector(".clear");

  for (let i = 0; i < digitButtons.length; i++) {
    digitButtons[i].addEventListener("click", (e) => {
      const digit = digitButtons[i].textContent; 
      const display = document.querySelector(".display"); 

      if (dispOperator != '') {
        if (display.textContent == dispOperandA) {
          display.textContent = '';
        }
        if (dispOperator == '=') {
          dispOperandA = digit;
          dispOperator = '';
        } else {
          dispOperandB = (dispOperandB == '0') ? digit : dispOperandB + digit;
        }
      } else {
        dispOperandA = (dispOperandA == '0') ? digit : dispOperandA + digit;
      }

      display.textContent = (display.textContent == '0') ? 
        digit : display.textContent + digit; 
    })
  }

  for (let i = 0; i < opButtons.length; i++) {
    opButtons[i].addEventListener("click", (e) => {
      if (dispOperandA != '') {
        const prevOp = dispOperator;
        dispOperator = opButtons[i].textContent;

        if (dispOperandB != '' && prevOp) {
          const result = operate(prevOp, Number(dispOperandA), Number(dispOperandB));
          document.querySelector(".display").textContent = result;
          dispOperandA = String(result);
          dispOperandB = '';
        }
      }
    })
  }

  equalsButton.addEventListener("click", (e) => {
    if (dispOperandA != '' && dispOperandB != '' && dispOperator != '') {
      const result = operate(
        dispOperator, Number(dispOperandA), Number(dispOperandB)
      );
      document.querySelector(".display").textContent = result;
      dispOperandA = String(result);
      dispOperandB = '';
      dispOperator = '=';
    }
  })

  clearButton.addEventListener("click", (e) => {
    document.querySelector(".display").textContent = '0';
    dispOperandA = '';
    dispOperandB = '';
    dispOperator = '';
  })
}

setUpButtonClicks();