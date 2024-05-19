let iterations = []; // массив для хранения данных об итерациях

// Функция для добавления поля выбора сенса для каждой итерации
function addIteration() {
    let iterationNumber = iterations.length + 1;
    let iterationInput = `
        <label for="iteration${iterationNumber}">Iteration ${iterationNumber} Sensitivity:</label>
        <select id="iteration${iterationNumber}">
            <option value="lower">Lower</option>
            <option value="base" selected>Base</option>
            <option value="higher">Higher</option>
        </select>
    `;
    document.getElementById("iterationInputs").insertAdjacentHTML('beforeend', iterationInput);
    iterations.push("base"); // добавляем базовую сенсу по умолчанию
}

// Функция для рассчета идеальной сенсы
function calculateSensitivity() {
    let initialSensitivityInput = document.getElementById("initialSensitivity");
    let initialSensitivity = parseFloat(initialSensitivityInput.value);

    if (!isNaN(initialSensitivity)) {
        let sensitivityTable = [];

        // Добавляем начальную сенсу в таблицу
        sensitivityTable.push({ iteration: 0, sensitivity: initialSensitivity });

        // Для каждой итерации получаем выбранную пользователем сенсу и рассчитываем следующую
        iterations.forEach((sensitivityType, index) => {
            let sensitivity;
            if (sensitivityType === "lower") {
                sensitivity = sensitivityTable[index].sensitivity / Math.sqrt(2);
            } else if (sensitivityType === "base") {
                sensitivity = sensitivityTable[index].sensitivity;
            } else if (sensitivityType === "higher") {
                sensitivity = sensitivityTable[index].sensitivity * Math.sqrt(2);
            }
            sensitivityTable.push({ iteration: index + 1, sensitivity: sensitivity });
        });

        // Находим идеальную сенсу
        let idealSensitivity = sensitivityTable.reduce((prev, curr) => {
            return Math.abs(curr.sensitivity - 1) < Math.abs(prev.sensitivity - 1) ? curr : prev;
        });

        // Выводим результаты
        let resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <h2>Results:</h2>
            <table>
                <tr>
                    <th>Iteration</th>
                    <th>Sensitivity</th>
                </tr>
                ${sensitivityTable.map(entry => `
                    <tr>
                        <td>${entry.iteration}</td>
                        <td>${entry.sensitivity.toFixed(2)}</td>
                    </tr>
                `).join("")}
            </table>
            <p>Ideal Sensitivity: ${idealSensitivity.sensitivity.toFixed(2)}</p>
        `;
    } else {
        alert("Please enter a valid initial sensitivity.");
    }
}
