// Обработчик нажатия на кнопку "Низкий"
document.querySelector(".low-button").addEventListener("click", () => {
  const lastRow = document.querySelector(".table tbody").lastElementChild;
  if (!lastRow) {
    alert("Начните сначала, чтобы добавить новую строку");
    return;
  }

  const highText = lastRow.children[0].innerText;
  const middleText = lastRow.children[1].innerText;

  // Проверяем, что данные в ячейках можно преобразовать в числа
  if (isNaN(parseFloat(highText)) || isNaN(parseFloat(middleText))) {
    alert("Ошибка при получении данных из предыдущей строки");
    return;
  }

  const newLow = document.createElement("td");
  newLow.innerText = middleText;

  const newMiddle = document.createElement("td");
  if (calcMethodType == "простой") {
    newMiddle.innerText = Math.round(((parseFloat(middleText) + parseFloat(highText)) / 2) * 100) / 100;
  } else if (calcMethodType == "подробный") {
    newMiddle.innerText = Math.round(((parseFloat(middleText) + parseFloat(highText)) / 2) * 1000) / 1000;
  }

  const newHigh = document.createElement("td");
  newHigh.innerText = highText;

  const tr = document.createElement("tr");
  tr.appendChild(newHigh);
  tr.appendChild(newMiddle);
  tr.appendChild(newLow);

  const tbody = document.querySelector(".table tbody");
  tbody.appendChild(tr);

  calculationCheck(newHigh.innerText, newMiddle.innerText, newMiddle);
});

// Обработчик нажатия на кнопку "Высокий"
document.querySelector(".high-button").addEventListener("click", () => {
  const lastRow = document.querySelector(".table tbody").lastElementChild;
  if (!lastRow) {
    alert("Начните сначала, чтобы добавить новую строку");
    return;
  }

  const lowText = lastRow.children[2].innerText;
  const middleText = lastRow.children[1].innerText;

  // Проверяем, что данные в ячейках можно преобразовать в числа
  if (isNaN(parseFloat(lowText)) || isNaN(parseFloat(middleText))) {
    alert("Ошибка при получении данных из предыдущей строки");
    return;
  }

  const newMiddle = document.createElement("td");
  if (calcMethodType == "простой") {
    newMiddle.innerText = Math.round(((parseFloat(middleText) + parseFloat(lowText)) / 2) * 100) / 100;
  } else if (calcMethodType == "подробный") {
    newMiddle.innerText = Math.round(((parseFloat(middleText) + parseFloat(lowText)) / 2) * 1000) / 1000;
  }

  const newLow = document.createElement("td");
  newLow.innerText = lowText;

  const newHigh = document.createElement("td");
  newHigh.innerText = middleText;

  const tr = document.createElement("tr");
  tr.appendChild(newHigh);
  tr.appendChild(newMiddle);
  tr.appendChild(newLow);

  const tbody = document.querySelector(".table tbody");
  tbody.appendChild(tr);

  calculationCheck(newHigh.innerText, newMiddle.innerText, newMiddle);
});
