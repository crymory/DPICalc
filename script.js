function calculateSensitivity() {
    const baseSensitivity = parseFloat(document.getElementById('baseSensitivity').value);
    const adjustment = document.getElementById('adjustment').value;

    if (!baseSensitivity || !adjustment) {
        alert("Пожалуйста, введите все значения.");
        return;
    }

    let lowerSensitivity, higherSensitivity;

    if (adjustment === "increase") {
        lowerSensitivity = baseSensitivity;
        higherSensitivity = baseSensitivity * 2;
    } else {
        lowerSensitivity = baseSensitivity / 2;
        higherSensitivity = baseSensitivity;
    }

    const resultsBody = document.getElementById('resultsBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${lowerSensitivity.toFixed(2)}</td>
        <td>${baseSensitivity.toFixed(2)}</td>
        <td>${higherSensitivity.toFixed(2)}</td>
    `;

    resultsBody.appendChild(newRow);
}
