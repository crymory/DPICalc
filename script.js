// Флаг, указывающий выбранный режим расчета: "простой" или "подробный"
let calcMethodType = "простой";

// Обработчик нажатия на кнопку "Начать"
document.querySelector(".start-button").addEventListener("click", () => {
  // Получаем базовую сенсу для расчета
  const baseSens = document.querySelector(".base-sens-input").value;
  // Получаем радиокнопки для выбора режима расчета
  let calcMethod = document.querySelectorAll(".calc-mode-radio");

  // Определяем выбранный режим расчета
  for (let i = 0; i < calcMethod.length; i++) {
    if (calcMethod[i].checked) {
      calcMethodType = calcMethod[i].value;
    }
  }

  // Проверяем, что базовая сенса не пуста
  if (baseSens == "") {
    alert("Пожалуйста, введите базовую сенсу");
    return;
  }

  const tbody = document.querySelector(".table tbody");
  // Очищаем таблицу перед началом новых расчетов
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const tr = document.createElement("tr");
  let high = document.createElement("td");
  let middle = document.createElement("td");
  let low = document.createElement("td");

  // Выполняем расчет сенсы в зависимости от выбранного режима
  if (calcMethodType == "простой") {
    high.innerText = Math.round(baseSens * 1.5 * 100) / 100;
    middle.innerText = baseSens * 1;
    low.innerText = Math.round(baseSens * 0.5 * 100) / 100;
  } else if (calcMethodType == "подробный") {
    high.innerText = Math.round(baseSens * 1.5 * 1000) / 1000;
    middle.innerText = baseSens * 1;
    low.innerText = Math.round(baseSens * 0.5 * 1000) / 1000;
  }

  tr.appendChild(high);
  tr.appendChild(middle);
  tr.appendChild(low);

  tbody.appendChild(tr);
});

// Обработчик нажатия на кнопку "Низкий"
document.querySelector(".low-button").addEventListener("click", () => {
  const middle = document.querySelector(".table tbody").lastElementChild.children[1];
  const low = document.querySelector(".table tbody").lastElementChild.children[2];

  const newHigh = document.createElement("td");
  newHigh.innerText = middle.innerText;

  const newMiddle = document.createElement("td");
  if (calcMethodType == "простой") {
    newMiddle.innerText = Math.round(((Number(low.innerText) + Number(middle.innerText)) / 2) * 100) / 100;
  } else if (calcMethodType == "подробный") {
    newMiddle.innerText = Math.round(((Number(low.innerText) + Number(middle.innerText)) / 2) * 1000) / 1000;
  }

  const newLow = document.createElement("td");
  newLow.innerText = low.innerText;

  const tbody = document.querySelector(".table tbody");
  const tr = document.createElement("tr");

  tr.appendChild(newHigh);
  tr.appendChild(newMiddle);
  tr.appendChild(newLow);

  tbody.appendChild(tr);

  calculationCheck(newMiddle.innerText, newLow.innerText, newMiddle);
});

// Обработчик нажатия на кнопку "Высокий"
document.querySelector(".high-button").addEventListener("click", () => {
  const high = document.querySelector(".table tbody").lastElementChild.children[0];
  const middle = document.querySelector(".table tbody").lastElementChild.children[1];

  const newMiddle = document.createElement("td");
  if (calcMethodType == "простой") {
    newMiddle.innerText = Math.round(((Number(middle.innerText) + Number(high.innerText)) / 2) * 100) / 100;
  } else if (calcMethodType == "подробный") {
    newMiddle.innerText = Math.round(((Number(middle.innerText) + Number(high.innerText)) / 2) * 1000) / 1000;
  }

  const newLow = document.createElement("td");
  newLow.innerText = middle.innerText;

  const newHigh = document.createElement("td");
  newHigh.innerText = high.innerText;

  const tbody = document.querySelector(".table tbody");
  const tr = document.createElement("tr");

  tr.appendChild(newLow);
  tr.appendChild(newMiddle);
  tr.appendChild(newHigh);

  tbody.appendChild(tr);

  calculationCheck(newHigh.innerText, newMiddle.innerText, newMiddle);
});

// Функция для проверки условия завершения расчетов и вывода сообщения
const calculationCheck = (a, b, newMiddle) => {
  if (calcMethodType == "простой") {
    if (Math.round((Number(a) - Number(b)) * 100) / 100 <= 0.01) {
      alert(`Ваша идеальная сенса: ${newMiddle.innerText}`);
    }
  } else if (calcMethodType == "подробный") {
    if (Math.round((Number(a) - Number(b)) * 1000) / 1000 <= 0.001) {
      alert(`Ваша идеальная сенса: ${newMiddle.innerText}`);
    }
  }
};
