// Функция для получения значения с экрана
function getDisplayValue() {
  return display.textContent;
}

// Функция для обновления значения на экране
function setDisplayValue(newValue) {
  display.textContent = newValue;
}

// Функция для добавления числа к текущему значению на экране
function appendNumberToCurrent(number) {
  currentNumber += number;
  setDisplayValue(currentNumber);
}

// Функция для обработки нажатия кнопки с числом
function handleNumberButtonClick(number) {
  if (currentOperator === null) {
    appendNumberToCurrent(number);
  } else {
    // Если есть оператор, начнем новое число
    currentNumber = number;
    setDisplayValue(currentNumber);
  }
}

// Функция для обработки нажатия кнопки оператора
function handleOperatorButtonClick(operator) {
  if (currentNumber) {
    previousNumber = parseFloat(getDisplayValue());
    currentOperator = operator;
    currentNumber = '';
    setDisplayValue('');
  }
}

// Функция для обработки нажатия кнопки "="
function handleEqualsButtonClick() {
  if (currentNumber && currentOperator) {
    const result = calculate(previousNumber, currentNumber, currentOperator);
    setDisplayValue(result);
    previousNumber = result;
    currentNumber = '';
    currentOperator = null;
  }
}

// Функция для обработки нажатия кнопки "C" (очистка)
function handleClearButtonClick() {
  currentNumber = '';
  previousNumber = null;
  currentOperator = null;
  setDisplayValue('');
}

// Функция для обработки нажатия кнопки "←" (backspace)
function handleBackspaceButtonClick() {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1);
    setDisplayValue(currentNumber);
  }
}

// Функция для вычисления результата
function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return NaN;
  }
}

// Инициализация переменных
const display = document.querySelector('.display');
let currentNumber = '';
let previousNumber = null;
let currentOperator = null;

// Обработчики событий для кнопок
const numberButtons = document.querySelectorAll('.button.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.dataset.action;
    handleNumberButtonClick(number);
  });
});

const operatorButtons = document.querySelectorAll('.button.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operator = button.dataset.action;
    handleOperatorButtonClick(operator);
  });
});

const equalsButton = document.querySelector('.button.equals');
equalsButton.addEventListener('click', handleEqualsButtonClick);

const clearButton = document.querySelector('.button.clear');
clearButton.addEventListener('click', handleClearButtonClick);

const backspaceButton = document.querySelector('.button.backspace');
backspaceButton.addEventListener('click', handleBackspaceButtonClick);
