function calculateIdealSensitivity(initialSensitivity, sensitivityType) {
    let lowerSensitivity, baseSensitivity, higherSensitivity;
    
    if (sensitivityType === "lower") {
        lowerSensitivity = initialSensitivity;
        baseSensitivity = initialSensitivity * Math.sqrt(2);
        higherSensitivity = initialSensitivity * Math.pow(Math.sqrt(2), 2);
    } else {
        lowerSensitivity = initialSensitivity / Math.pow(Math.sqrt(2), 2);
        baseSensitivity = initialSensitivity / Math.sqrt(2);
        higherSensitivity = initialSensitivity;
    }

    let sensitivityTable = [];

    sensitivityTable.push({ iteration: 0, sensitivity: lowerSensitivity });
    sensitivityTable.push({ iteration: 1, sensitivity: baseSensitivity });
    sensitivityTable.push({ iteration: 2, sensitivity: higherSensitivity });

    for (let i = 3; i < 7; i++) {
        lowerSensitivity = (lowerSensitivity + baseSensitivity) / 2;
        higherSensitivity = (baseSensitivity + higherSensitivity) / 2;

        sensitivityTable.push({ iteration: i, sensitivity: lowerSensitivity });
        sensitivityTable.push({ iteration: i + 1, sensitivity: baseSensitivity });
        sensitivityTable.push({ iteration: i + 2, sensitivity: higherSensitivity });

        i += 2;
    }

    let idealSensitivity = sensitivityTable.reduce((prev, curr) => {
        return Math.abs(curr.sensitivity - 1) < Math.abs(prev.sensitivity - 1) ? curr : prev;
    });

    return { sensitivityTable: sensitivityTable, idealSensitivity: idealSensitivity };
}

function calculateSensitivity() {
    let initialSensitivityInput = document.getElementById("initialSensitivity");
    let sensitivityTypeSelect = document.getElementById("sensitivityType");
    
    let initialSensitivity = parseFloat(initialSensitivityInput.value);
    let sensitivityType = sensitivityTypeSelect.value;

    if (!isNaN(initialSensitivity)) {
        let result = calculateIdealSensitivity(initialSensitivity, sensitivityType);
        let resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <h2>Results:</h2>
            <table>
                <tr>
                    <th>Iteration</th>
                    <th>Sensitivity</th>
                </tr>
                ${result.sensitivityTable.map(entry => `
                    <tr>
                        <td>${entry.iteration}</td>
                        <td>${entry.sensitivity.toFixed(2)}</td>
                    </tr>
                `).join("")}
            </table>
            <p>Ideal Sensitivity: ${result.idealSensitivity.sensitivity.toFixed(2)}</p>
        `;
    } else {
        alert("Please enter a valid initial sensitivity.");
    }
}
