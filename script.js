// 簡単計算モードと詳細計算モードどちらを選択しているかのフラグ
let calcMethodType = "easy";

// 開始ボタン押下時処理
document.querySelector(".start-button").addEventListener("click", () => {
  // 計算の元となるベース感度を取得
  const baseSens = document.querySelector(".base-sens-input").value;
  // 簡単計算モードと詳細計算モードのラジオボタンを取得
  let calcMethod = document.querySelectorAll(".calc-mode-radio");
  console.log(calcMethod);

  // 簡単計算モードと詳細計算モードどちらを選択しているかを取得
  for (let i = 0; i < calcMethod.length; i++) {
    if (calcMethod[i].checked) {
      calcMethodType = calcMethod[i].value;
      console.log(calcMethodType);
    }
  }

  // ベース感度空欄チェック
  if (baseSens == "") {
    alert("ベース感度を入力してください");
    return;
  }

  const tbody = document.querySelector(".table tbody");
  // 開始ボタン押下で履歴リセット
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const tr = document.createElement("tr");
  let high = document.createElement("td");
  let middle = document.createElement("td");
  let low = document.createElement("td");

  if (calcMethodType == "easy") {
    high.innerText = Math.round(baseSens * 1.5 * 100) / 100;
    middle.innerText = baseSens * 1;
    low.innerText = Math.round(baseSens * 0.5 * 100) / 100;
  } else if (calcMethodType == "detailed") {
    high.innerText = Math.round(baseSens * 1.5 * 1000) / 1000;
    middle.innerText = baseSens * 1;
    low.innerText = Math.round(baseSens * 0.5 * 1000) / 1000;
  }

  tr.appendChild(high);
  tr.appendChild(middle);
  tr.appendChild(low);

  tbody.appendChild(tr);
});

// ローボタン押下時処理
document.querySelector(".low-button").addEventListener("click", () => {
  const middle = document.querySelector(".table tbody").lastElementChild.children[1];
  const low = document.querySelector(".table tbody").lastElementChild.children[2];

  const newHigh = document.createElement("td");
  newHigh.innerText = middle.innerText;

  const newMiddle = document.createElement("td");
  if (calcMethodType == "easy") {
    newMiddle.innerText = Math.round(((Number(low.innerText) + Number(middle.innerText)) / 2) * 100) / 100;
  } else if (calcMethodType == "detailed") {
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

// ハイボタン押下時処理
document.querySelector(".high-button").addEventListener("click", () => {
  const high = document.querySelector(".table tbody").lastElementChild.children[0];
  const middle = document.querySelector(".table tbody").lastElementChild.children[1];

  const newMiddle = document.createElement("td");
  if (calcMethodType == "easy") {
    newMiddle.innerText = Math.round(((Number(middle.innerText) + Number(high.innerText)) / 2) * 100) / 100;
  } else if (calcMethodType == "detailed") {
    newMiddle.innerText = Math.round(((Number(middle.innerText) + Number(high.innerText)) / 2) * 1000) / 1000;
  }

  const newLow = document.createElement("td");
  newLow.innerText = middle.innerText;

  const newHigh = document.createElement("td");
  newHigh.innerText = high.innerText;

  const tbody = document.querySelector(".table tbody");
  const tr = document.createElement("tr");

  tr.appendChild(newHigh);
  tr.appendChild(newMiddle);
  tr.appendChild(newLow);

  tbody.appendChild(tr);

  calculationCheck(newHigh.innerText, newMiddle.innerText, newMiddle);
});

const calculationCheck = (a, b, newMiddle) => {
  if (calcMethodType == "easy") {
    if (Math.round((Number(a) - Number(b)) * 100) / 100 <= 0.01) {
      alert(`あなたに最適な感度は${newMiddle.innerText}です`);
    }
  } else if (calcMethodType == "detailed") {
    if (Math.round((Number(a) - Number(b)) * 1000) / 1000 <= 0.001) {
      alert(`あなたに最適な感度は${newMiddle.innerText}です`);
    }
  }
};
