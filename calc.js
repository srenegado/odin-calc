let dispOperandA = '0';
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

function setUpButtonClicksAndPresses() {
  const display = document.querySelector(".display");
  const digitButtons = document.querySelectorAll(".digit");
  const opButtons = document.querySelectorAll(".op");
  const equalsButton = document.querySelector(".equals");
  const clearButton = document.querySelector(".clear");
  const decimalButton = document.querySelector(".decimal");
  const backspaceButton = document.querySelector(".backspace");

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        handleDigit(e.key);
        break;
      case '+': case '-': case '*': case '/':
        handleOp(e.key);
        break;
      case '=': case 'Enter':
        handleEquals();
        break;
      case 'Delete':
        handleClear();
        break;
      case '.':
        handleDecimal();
        break;
      case 'Backspace':
        handleBackspace();
        break;
    }
  });

  digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", () => {
      handleDigit(digitButton.textContent);
    });
  });

  opButtons.forEach((opButton) => {
    opButton.addEventListener("click", () => {
      handleOp(opButton.textContent);
    });
  });

  equalsButton.addEventListener("click", (e) => {
    handleEquals();
  });

  clearButton.addEventListener("click", (e) => {
    handleClear();
  });

  decimalButton.addEventListener("click", (e) => {
    handleDecimal();
  });

  backspaceButton.addEventListener("click", (e) => {
    handleBackspace();
  });

  function handleDigit(digit) {
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
  }

  function handleOp(op) {
    if (dispOperandA) {
      const prevOp = dispOperator;
      dispOperator = op;

      if (dispOperandB && prevOp) {
        if (dispOperandB == '0' && (prevOp == '÷' || prevOp == '/')) {
          display.textContent = divideByZeroError;
          dispOperandA = '';
          dispOperator = '';
        } else {
          let result = operate(prevOp, Number(dispOperandA), Number(dispOperandB));
          result = round(result, 9);
          display.textContent = result;
          dispOperandA = String(result); 
        }
        dispOperandB = '';
      }
    }
  }

   function handleEquals() {
    if (dispOperandA && dispOperandB && dispOperator) {
      if (dispOperandB == '0' && (dispOperator == '÷' || dispOperator == '/')) {
        display.textContent = divideByZeroError;
        dispOperandA = '';
        dispOperator = '';
      } else {
        let result = operate(dispOperator, Number(dispOperandA), Number(dispOperandB));
        result = round(result, 9);
        display.textContent = result;
        dispOperandA = String(result);
        dispOperator = '=';
      }
      dispOperandB = '';
    }
  }

  function handleClear() {
    display.textContent = '0';
    dispOperandA = '0';
    dispOperandB = '';
    dispOperator = '';
  }

  function handleDecimal() {
    if (display.textContent.includes(".")) {
      return;
    }

    if (dispOperator) {
      if (display.textContent == dispOperandA) {
        display.textContent = '';
      }
      if (dispOperator == '=') {
        dispOperandA = '.';
        dispOperator = '';
      } else {
        dispOperandB += '.';
      }
    } else {
      dispOperandA += '.';
    }

    display.textContent = (display.textContent == divideByZeroError) ? 
      '.' : display.textContent + '.';
  }

  function handleBackspace() {
    display.textContent = '';
    if (dispOperator && dispOperandA) {
      dispOperandB = '';
    } else {
      dispOperandA = '';
    }
  }
}

setUpButtonClicksAndPresses();