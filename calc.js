let dispOperandA = '';
let dispOperandB = '';
let dispOperator = '';
const divideByZeroError = "Divide by Zero Error";

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

function round(num, n) {
  const scale = Math.pow(10, n);
  return Math.round(num * scale) / scale;
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

      if (dispOperator) {
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

      display.textContent = (display.textContent == '0' || 
        display.textContent == divideByZeroError) ? 
        digit : display.textContent + digit; 
    })
  }

  for (let i = 0; i < opButtons.length; i++) {
    opButtons[i].addEventListener("click", (e) => {
      if (dispOperandA) {
        const prevOp = dispOperator;
        dispOperator = opButtons[i].textContent;

        if (dispOperandB && prevOp) {
          if (dispOperandB == '0' && prevOp == '÷') {
            document.querySelector(".display").textContent = divideByZeroError;
            dispOperandA = '';
            dispOperator = '';
          } else {
            let result = operate(prevOp, Number(dispOperandA), Number(dispOperandB));
            result = round(result, 9);
            document.querySelector(".display").textContent = result;
            dispOperandA = String(result); 
          }
          dispOperandB = '';
        }
      }
    })
  }

  equalsButton.addEventListener("click", (e) => {
    if (dispOperandA && dispOperandB && dispOperator) {
      if (dispOperandB == '0' && dispOperator == '÷') {
        document.querySelector(".display").textContent = divideByZeroError;
        dispOperandA = '';
        dispOperator = '';
      } else {
        let result = operate(dispOperator, Number(dispOperandA), Number(dispOperandB));
        result = round(result, 9);
        document.querySelector(".display").textContent = result;
        dispOperandA = String(result);
        dispOperator = '=';
      }
      dispOperandB = '';
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