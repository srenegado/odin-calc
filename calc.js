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

      if (dispOperandA != '' && dispOperator != '') {
        if (display.textContent == dispOperandA) {
          display.textContent = '';
        }
        dispOperandB += digit;
      } else {
        if (dispOperandA == '' && dispOperandB == '') {
          display.textContent = '';
        }
        dispOperandA += digit;
      }

      display.textContent += digit;    
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
      dispOperandA = '';
      dispOperandB = '';
      dispOperator = '';
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