// Constants for sensitivity calculation
const GAME_PRESETS = {
  "cs2": { name: "CS2", ratio: 1.0 },
  "valorant": { name: "Valorant", ratio: 0.314 },
  "apex": { name: "Apex Legends", ratio: 1.0 },
  "fortnite": { name: "Fortnite", ratio: 0.629 },
  "overwatch": { name: "Overwatch", ratio: 3.33 }
};

// State variables
let calcMethodType = "easy";
let currentGame = "cs2";
let calculationHistory = [];
let baseSensitivity = 0.7;
let dpi = 800;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  populateGameSelector();
  updateDpiDisplay();
});

function setupEventListeners() {
  // Start button
  document.querySelector(".start-button").addEventListener("click", startCalculation);
  
  // Sensitivity buttons
  document.querySelector(".high-button").addEventListener("click", () => adjustSensitivity("high"));
  document.querySelector(".low-button").addEventListener("click", () => adjustSensitivity("low"));
  document.querySelector(".perfect-button").addEventListener("click", selectPerfectSensitivity);
  
  // Reset button
  document.querySelector(".reset-button").addEventListener("click", resetCalculation);
  
  // DPI buttons
  document.querySelector(".dpi-increase").addEventListener("click", () => changeDpi(100));
  document.querySelector(".dpi-decrease").addEventListener("click", () => changeDpi(-100));
  
  // Game selector
  document.querySelector(".game-selector").addEventListener("change", changeGame);
  
  // Radio buttons for calculation mode
  document.querySelectorAll(".calc-mode-radio").forEach(radio => {
    radio.addEventListener("change", (e) => {
      calcMethodType = e.target.value;
      if (calculationHistory.length > 0) {
        renderTable();
      }
    });
  });
  
  // Base sensitivity input validation
  document.querySelector(".base-sens-input").addEventListener("input", (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) {
      e.target.classList.add("error");
    } else {
      e.target.classList.remove("error");
      baseSensitivity = parseFloat(value);
    }
  });
}

function populateGameSelector() {
  const selector = document.querySelector(".game-selector");
  Object.keys(GAME_PRESETS).forEach(gameKey => {
    const option = document.createElement("option");
    option.value = gameKey;
    option.textContent = GAME_PRESETS[gameKey].name;
    selector.appendChild(option);
  });
}

function startCalculation() {
  const baseSensInput = document.querySelector(".base-sens-input");
  baseSensitivity = parseFloat(baseSensInput.value);
  
  // Input validation
  if (isNaN(baseSensitivity) || baseSensitivity <= 0) {
    showNotification("Введите корректную базовую чувствительность", "error");
    return;
  }
  
  // Reset history and calculate initial values
  calculationHistory = [];
  
  // Calculate initial high, middle, low sensitivities
  addToHistory({
    high: roundNumber(baseSensitivity * 1.5),
    middle: baseSensitivity,
    low: roundNumber(baseSensitivity * 0.5)
  });
  
  // Update UI
  renderTable();
  showNotification("Расчёт начат", "success");
  document.querySelector(".sens-buttons").classList.remove("hidden");
}

function addToHistory(entry) {
  calculationHistory.push(entry);
}

function renderTable() {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = "";
  
  calculationHistory.forEach((entry, index) => {
    const tr = document.createElement("tr");
    
    const highTd = document.createElement("td");
    highTd.textContent = roundNumber(entry.high);
    
    const middleTd = document.createElement("td");
    middleTd.textContent = roundNumber(entry.middle);
    
    const lowTd = document.createElement("td");
    lowTd.textContent = roundNumber(entry.low);
    
    // Highlight the current row
    if (index === calculationHistory.length - 1) {
      tr.classList.add("current-row");
    }
    
    tr.appendChild(highTd);
    tr.appendChild(middleTd);
    tr.appendChild(lowTd);
    
    tbody.appendChild(tr);
  });
  
  // Scroll to the bottom of the table
  const tableContainer = document.querySelector(".table-container");
  tableContainer.scrollTop = tableContainer.scrollHeight;
  
  // Update eDPI and cm/360 display
  updateSensitivityInfo();
}

function adjustSensitivity(type) {
  const lastEntry = calculationHistory[calculationHistory.length - 1];
  let newEntry;
  
  if (type === "low") {
    newEntry = {
      high: lastEntry.middle,
      middle: roundNumber((lastEntry.middle + lastEntry.low) / 2),
      low: lastEntry.low
    };
  } else { // high
    newEntry = {
      high: lastEntry.high,
      middle: roundNumber((lastEntry.high + lastEntry.middle) / 2),
      low: lastEntry.middle
    };
  }
  
  addToHistory(newEntry);
  renderTable();
  
  // Check if we've found the perfect sensitivity
  checkPerfectSensitivity();
}

function checkPerfectSensitivity() {
  const lastEntry = calculationHistory[calculationHistory.length - 1];
  const precision = calcMethodType === "easy" ? 0.01 : 0.001;
  
  // Check if high-low difference is small enough
  if (Math.abs(lastEntry.high - lastEntry.low) <= precision * 2) {
    showNotification(`Идеальная чувствительность: ${roundNumber(lastEntry.middle)}`, "success");
    document.querySelector(".perfect-button").classList.remove("hidden");
  }
}

function selectPerfectSensitivity() {
  const lastEntry = calculationHistory[calculationHistory.length - 1];
  document.querySelector(".base-sens-input").value = lastEntry.middle;
  baseSensitivity = lastEntry.middle;
  updateSensitivityInfo();
  showNotification(`Чувствительность ${roundNumber(lastEntry.middle)} установлена как основная`, "success");
}

function roundNumber(num) {
  return calcMethodType === "easy" 
    ? Math.round(num * 100) / 100 
    : Math.round(num * 1000) / 1000;
}

function resetCalculation() {
  calculationHistory = [];
  renderTable();
  document.querySelector(".sens-buttons").classList.add("hidden");
  document.querySelector(".perfect-button").classList.add("hidden");
  showNotification("Расчёт сброшен", "info");
}

function changeDpi(change) {
  dpi += change;
  if (dpi < 100) dpi = 100;
  updateDpiDisplay();
  updateSensitivityInfo();
}

function updateDpiDisplay() {
  document.querySelector(".dpi-value").textContent = dpi;
}

function changeGame(e) {
  currentGame = e.target.value;
  updateSensitivityInfo();
}

function updateSensitivityInfo() {
  if (calculationHistory.length === 0) return;
  
  const lastEntry = calculationHistory[calculationHistory.length - 1];
  const gameRatio = GAME_PRESETS[currentGame].ratio;
  const currentSens = lastEntry.middle;
  
  // Calculate eDPI (DPI * sensitivity)
  const eDPI = dpi * currentSens;
  
  // Calculate cm/360 (how many cm to move mouse for 360° turn)
  // Formula: (360 / (sensitivity * DPI)) * 2.54
  const cm360 = Math.round((360 / (currentSens * dpi * gameRatio)) * 2.54 * 10) / 10;
  
  document.querySelector(".edpi-value").textContent = Math.round(eDPI);
  document.querySelector(".cm360-value").textContent = cm360;
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.querySelector(".notification-area").appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}
