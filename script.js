class Calculator {
  constructor(previousCalculationElement, currentCalculationElement) {
    this.previousCalculationElement = previousCalculationElement;
    this.currentCalculationElement = currentCalculationElement;
    this.clearAll();
  }

  clearAll() {
    this.previousOperand = '';
    this.currentOperand = '0';
    this.operation = undefined;
  }

  clearEntry() {
    this.currentOperand = '0';
  }

  delete() {
    this.currentOperand =
      this.currentOperand.toString().length > 1 ? this.currentOperand.toString().slice(0, -1) : '0';
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this._newOperation) {
      this.currentOperand = number.toString();
      this._newOperation = false;
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this._newOperation = true;
    this.previousOperand = this.currentOperand;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '×':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      case 'x2':
        computation = curr ** 2;
      default:
        return;
    }

    this.currentOperand = computation;
    this.previousOperand += `${this.currentOperand}`;
    this.operation = undefined;
  }

  _getDisplayNumber(number) {
    const numberString = number.toString();
    const integerDigits = parseFloat(numberString.split('.')[0]);
    const decimalDigits = numberString.split('.')[1];
    let integerDisplay = isNaN(integerDigits)
      ? ''
      : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    return isNaN(decimalDigits) ? integerDisplay : `${integerDisplay}.${decimalDigits}`;
  }

  updateDisplay() {
    this.currentCalculationElement.innerText = this._getDisplayNumber(this.currentOperand);

    this.previousCalculationElement.innerText = this.operation
      ? `${this._getDisplayNumber(this.previousOperand)} ${this.operation}`
      : '';
  }
}

const clearEntryButton = document.querySelector('.clear-entry');
const clearAllButton = document.querySelector('.clear-all');
const deleteButton = document.querySelector('.delete');
const equalButton = document.querySelector('.equal');

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const specialOperationButtons = document.querySelectorAll('.special-operation');

const squareButton = document.querySelector('.square');
const previousCalculationElement = document.querySelector('.pre-calculation');
const currentCalculationElement = document.querySelector('.cur-calculation');

const calculator = new Calculator(previousCalculationElement, currentCalculationElement);

numberButtons.forEach(button =>
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

operationButtons.forEach(button =>
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
);

specialOperationButtons.forEach(button =>
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
);

equalButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

clearEntryButton.addEventListener('click', () => {
  calculator.clearEntry();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay(true);
});
